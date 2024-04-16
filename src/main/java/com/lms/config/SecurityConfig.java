package com.lms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.lms.security.JwtAuthenticationEntryPoint;
import com.lms.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationEntryPoint point;

	@Autowired
	private JwtAuthenticationFilter filter;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static final String[] WHITE_LIST_APIS = { "/auth/login", "/auth/refreshToken", "/global/getLatestTenBooks",
			"/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html" };

	public static final String[] ADMIN_APIS = { "/auth/create-user", "/admin/**" };

	public static final String[] TEACHER_APIS = { "/auth/create-user", "/teacher/**" };

	public static final String[] STUDENT_APIS = { "/student/**" };

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.disable())
				.authorizeHttpRequests(auth -> auth.requestMatchers(WHITE_LIST_APIS).permitAll()
						.requestMatchers(ADMIN_APIS).hasRole("ADMIN")
						.requestMatchers(TEACHER_APIS).hasRole("TEACHER")
						.requestMatchers(STUDENT_APIS).hasRole("STUDENT").anyRequest().authenticated())
				.exceptionHandling(ex -> ex.authenticationEntryPoint(point))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder);
		return provider;
	}

}
