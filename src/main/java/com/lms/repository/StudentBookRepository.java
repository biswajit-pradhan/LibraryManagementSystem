package com.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.entity.StudentBook;

public interface StudentBookRepository extends JpaRepository<StudentBook, Integer>{

}
