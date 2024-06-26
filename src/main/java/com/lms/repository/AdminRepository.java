package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer>{

	Optional<Admin> findAdminByAdminEmail(String string);

}
