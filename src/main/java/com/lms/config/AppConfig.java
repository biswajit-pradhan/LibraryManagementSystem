package com.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

//	@Bean
//	public UserDetailsService userDetailsService() {
//		UserDetails user1 = User.builder().username("biswajit").password(passwordEncoder().encode("123"))
//				.roles("ADMIN").build();
//		UserDetails user2 = User.builder().username("debasish").password(passwordEncoder().encode("123"))
//				.roles("ADMIN").build();
//		return new InMemoryUserDetailsManager(user1,user2);
//		return new CustomUserDetailService();
//	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
		return builder.getAuthenticationManager();
	}
}
