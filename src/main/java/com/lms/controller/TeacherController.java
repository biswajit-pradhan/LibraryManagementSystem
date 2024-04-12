package com.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.entity.Book;
import com.lms.entity.Student;
import com.lms.service.TeacherService;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = { "*" })
public class TeacherController {

	@Autowired
	private TeacherService teacherService;

	@PostMapping("/addBook")
	public ResponseEntity<?> addBook(@RequestBody Book book) {
		return ResponseEntity.ok(teacherService.addBook(book));
	}
	
	@GetMapping("/getAllBooks")
	public ResponseEntity<?> getAllBooks() {
		return ResponseEntity.ok(teacherService.getAllBooks());
	}

	@DeleteMapping("/deleteBookByBookId/{bookId}")
	public ResponseEntity<?> deleteBookByBookId(@PathVariable("bookId") int bookId) {
		return ResponseEntity.ok(teacherService.deleteBookByBookId(bookId));
	}

	@PostMapping("/addStudent")
	public ResponseEntity<?> addStudent(@RequestBody Student student) {
		return ResponseEntity.ok(teacherService.addStudent(student));
	}
	
	@GetMapping("/getAllStudents")
	public ResponseEntity<?> getAllStudents() {
		return ResponseEntity.ok(teacherService.getAllStudents());
	}
	
	@GetMapping("/getAllBooksAllocatedToAStudent/{studentId}")
	public ResponseEntity<?> getAllBooksAllocatedToAStudent(@PathVariable("studentId") int studentId) {
		return ResponseEntity.ok(teacherService.getAllBooksAllocatedToAStudent(studentId));
	}
	
	@DeleteMapping("/deleteStudentByStudentId/{studentId}")
	public ResponseEntity<?> deleteStudentByStudentId(@PathVariable("studentId") int studentId) {
		return ResponseEntity.ok(teacherService.deleteStudentByStudentId(studentId));
	}

	@PutMapping("/allocateBookToAStudent/{bookId}/{studentId}")
	public ResponseEntity<?> allocateBookToAStudent(@PathVariable("bookId") int bookId,
			@PathVariable("studentId") int studentId) {
		return ResponseEntity.ok(teacherService.allocateBookToAStudent(bookId, studentId));
	}

	@PutMapping("/deallocateBookFromAStudent/{bookId}/{studentId}")
	public ResponseEntity<?> deallocateBookFromAStudent(@PathVariable("bookId") int bookId,
			@PathVariable("studentId") int studentId) {
		return ResponseEntity.ok(teacherService.deallocateBookFromAStudent(bookId, studentId));
	}

	@PutMapping("/extendBookAllocationDateForAStudent/{bookId}/{studentId}")
	public ResponseEntity<?> extendBookAllocationDateForAStudent(@PathVariable("bookId") int bookId,
			@PathVariable("studentId") int studentId) {
		return ResponseEntity.ok(teacherService.extendBookAllocationDateForAStudent(bookId, studentId));
	}

	@PutMapping("/isBookAllocationEnded/{studentBookId}")
	public ResponseEntity<?> isBookAllocationEnded(@PathVariable("studentBookId") int studentBookId) {
		return ResponseEntity.ok(teacherService.isBookAllocationEnded(studentBookId));
	}

}
