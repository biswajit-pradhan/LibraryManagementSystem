package com.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.entity.Student;
import com.lms.entity.StudentBook;
import com.lms.exception.BookNotAllocatedToStudentException;
import com.lms.exception.StudentNotFoundException;
import com.lms.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;

	public List<StudentBook> getAllBooksTakenByAStudent(String studentUsername) {
		Optional<Student> student = studentRepository.findStudentByStudentEmail(studentUsername);
		if (student.isPresent()) {
			List<StudentBook> totalBooks = student.get().getBooksTakenByStudent();
			if(totalBooks.size()>0) {
				return totalBooks;
			}else {
				throw new BookNotAllocatedToStudentException("Student with username "+studentUsername+" have not allocated any books!!");
			}

		} else {
			throw new StudentNotFoundException("Student data with username " + studentUsername + " is not available!!");
		}
	}

}
