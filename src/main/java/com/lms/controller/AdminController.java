package com.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.entity.Teacher;
import com.lms.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = { "*" })
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@GetMapping("/getAllTeachers")
	public ResponseEntity<?> getAllTeachers() {
		return ResponseEntity.ok(adminService.getAllTeachers());
	}
	
	@GetMapping("/getAllStudents")
	public ResponseEntity<?> getAllStudents() {
		return ResponseEntity.ok(adminService.getAllStudents());
	}
	
	@PostMapping("/addTeacher")
	public ResponseEntity<?> addTeacher(@RequestBody Teacher teacher) {
		return ResponseEntity.ok(adminService.addTeacher(teacher));
	}

	@DeleteMapping("/deleteTeacherByTeacherEmail")
	public ResponseEntity<?> deleteTeacherByTeacherEmail(@RequestBody String teacherEmail) {
		return ResponseEntity.ok(adminService.deleteTeacherByTeacherEmail(teacherEmail));
	}

	@DeleteMapping("/deleteStudentByStudentEmail")
	public ResponseEntity<?> deleteStudentByStudentEmail(@RequestBody String studentEmail) {
		return ResponseEntity.ok(adminService.deleteStudentByStudentEmail(studentEmail));
	}
}
