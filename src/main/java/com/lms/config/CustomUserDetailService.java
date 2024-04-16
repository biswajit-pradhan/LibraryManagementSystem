package com.lms.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lms.entity.UserInfo;
import com.lms.repository.UserInfoRepository;



@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
    private UserInfoRepository userInforepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userInfo = userInforepository.findByEmail(username);
        return userInfo.map(UserInfoToUserDetailsConverter::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found with username:" + username));

    }

}
