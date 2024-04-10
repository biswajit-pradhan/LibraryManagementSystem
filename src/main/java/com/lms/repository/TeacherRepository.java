package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
	public Optional<Teacher> findTeacherByTeacherEmail(String teacherEmail);
}
