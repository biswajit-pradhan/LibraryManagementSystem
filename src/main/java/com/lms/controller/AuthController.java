package com.lms.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.dto.JwtRequest;
import com.lms.dto.JwtResponse;
import com.lms.entity.UserInfo;
import com.lms.exception.BadCredentialsException;
import com.lms.security.JwtHelper;
import com.lms.service.UserInfoService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = { "*" })
public class AuthController {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelper helper;
	
	@Autowired
	private UserInfoService userInfoService;
	
//	@Autowired
//    private RefreshTokenService refreshTokenService;

//	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody JwtRequest request) {

		this.doAuthenticate(request.getUsername(), request.getPassword());

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.helper.generateToken(userDetails);
		Optional<UserInfo> userInfo=userInfoService.getAllUsers().stream()
				.filter(u->u.getEmail().equals(userDetails.getUsername())).findAny();
		String roles=userInfo.get().getRoles();
		
		return ResponseEntity.ok(JwtResponse.builder().jwtToken(token).username(userDetails.getUsername()).roles(roles).build());
	}

	private void doAuthenticate(String username, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
		try {
			manager.authenticate(authentication);

		} catch (Exception e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}
	
//	@PostMapping("/refreshToken")
//	public JwtResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
//	    RefreshToken refreshToken = refreshTokenService.findByRefreshToken(refreshTokenRequest.getRefreshToken())
//	            .orElseThrow(() -> new RuntimeException("Refresh token is not in the database!"));
//
//	    refreshTokenService.verifyExpiration(refreshToken);
//
//	    UserInfo userInfo = refreshToken.getUserInfo();
//	    
//	    UserDetails userDetails = userDetailsService.loadUserByUsername(userInfo.getEmail());
//
//	    String jwtToken = this.helper.generateToken(userDetails);
//
//	    return JwtResponse.builder()
//	            .jwtToken(jwtToken)
//	            .refreshToken(refreshTokenRequest.getRefreshToken())
//	            .username(userInfo.getEmail())
//	            .build();
//	}

	
	@PostMapping("/create-user")
	public UserInfo createUser(@RequestBody UserInfo user) {
		return userInfoService.addUser(user);
	}

}
