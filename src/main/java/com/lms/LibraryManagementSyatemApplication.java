package com.lms;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.lms.entity.Admin;
import com.lms.repository.AdminRepository;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class LibraryManagementSyatemApplication {

	@Autowired
	private AdminRepository adminRepository;

	public static void main(String[] args) {
		SpringApplication.run(LibraryManagementSyatemApplication.class, args);
	}

	@PostConstruct
	public void initAdmin() {
		
		Optional<Admin> existingAdmin = adminRepository.findAdminByAdminEmail("admin");

		if (existingAdmin.isEmpty()) {
			Admin admin = Admin.builder().adminEmail("admin").adminPassword("admin").build();
			adminRepository.save(admin);
		}

	}
}
