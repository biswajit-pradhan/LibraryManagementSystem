package com.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = { "*" })
public class StudentController {

	@Autowired
	private StudentService studentService;

	@GetMapping("/getAllBooksTakenByAStudent/{studentUsername}")
	public ResponseEntity<?> getAllBooksTakenByAStudent(@PathVariable("studentUsername") String studentUsername) {
		return ResponseEntity.ok(studentService.getAllBooksTakenByAStudent(studentUsername));
	}

}
