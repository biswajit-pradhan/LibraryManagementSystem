package com.lms.controller;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.entity.Book;
import com.lms.repository.BookRepository;

@RestController
@CrossOrigin(origins = { "*" })
public class GlobalController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping("/getLatestTenBooks")
	public ResponseEntity<?> getLatestTenBooks() {
		List<Book> topBooks = bookRepository.findAll()
	            .stream()
	            .sorted(Comparator.comparingInt(Book::getBookId)) // Sort by book ID
	            .limit(10) // Limit to the top 10 books
	            .collect(Collectors.toList());
		return ResponseEntity.ok(topBooks);
	}

}
