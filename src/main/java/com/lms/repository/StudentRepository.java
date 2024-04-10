package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>{

	public Optional<Student> findStudentByStudentEmail(String studentEmail);

}
