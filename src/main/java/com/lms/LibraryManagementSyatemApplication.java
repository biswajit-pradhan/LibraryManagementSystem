package com.lms;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lms.entity.Admin;
import com.lms.entity.UserInfo;
import com.lms.repository.AdminRepository;
import com.lms.repository.UserInfoRepository;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class LibraryManagementSyatemApplication {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private UserInfoRepository infoRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(LibraryManagementSyatemApplication.class, args);
	}

	@PostConstruct
	public void initAdmin() {

		Optional<Admin> existingAdmin = adminRepository.findAdminByAdminEmail("admin");
		Optional<UserInfo> existingUser = infoRepository.findByEmail("admin@gmail.com");

//		if (existingAdmin.isEmpty()) {
//			Admin admin = Admin.builder().adminEmail("admin").adminPassword("admin").build();
//			adminRepository.save(admin);
//
//		}
//		if (existingUser.isEmpty()) {
//			UserInfo user = UserInfo.builder().email("admin").password(passwordEncoder.encode("admin")).roles("ROLE_ADMIN").build();
//			infoRepository.save(user);
//		}
		
		if (existingAdmin.isEmpty()) {
			Admin admin = Admin.builder().adminEmail("string").adminPassword("string").build();
			adminRepository.save(admin);

		}
		if (existingUser.isEmpty()) {
			UserInfo user = UserInfo.builder().email("admin@gmail.com").password(passwordEncoder.encode("admin")).roles("ROLE_ADMIN,ROLE_TEACHER").build();
			infoRepository.save(user);
		}

	}
}
