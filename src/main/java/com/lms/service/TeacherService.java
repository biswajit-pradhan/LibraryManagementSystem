package com.lms.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.entity.Book;
import com.lms.entity.Student;
import com.lms.entity.StudentBook;
import com.lms.entity.UserInfo;
import com.lms.exception.BookAlreadyAssignedToStudentException;
import com.lms.exception.BookAlreadyExistException;
import com.lms.exception.BookNotAllocatedToStudentException;
import com.lms.exception.BookNotAssignedToAnyoneException;
import com.lms.exception.BookNotAvailableException;
import com.lms.exception.BookNotFoundException;
import com.lms.exception.BookNotTakenException;
import com.lms.exception.NoBooksFoundException;
import com.lms.exception.SameDateExtentionRequestException;
import com.lms.exception.StudentAlreadyRegisteredException;
import com.lms.exception.StudentBookDataNotFoundException;
import com.lms.exception.StudentHasSomeBookException;
import com.lms.exception.StudentNotFoundException;
import com.lms.repository.BookRepository;
import com.lms.repository.StudentBookRepository;
import com.lms.repository.StudentRepository;
import com.lms.repository.UserInfoRepository;

@Service
public class TeacherService {

	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private StudentBookRepository studentBookRepository;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public Book addBook(Book book) {
		Optional<Book> checkBookAvailableOrNot = bookRepository.findAll().stream()
				.filter(b -> b.getBookName().equals(book.getBookName()) && b.getIsbnNo().equals(book.getIsbnNo()))
				.findAny();
		if (checkBookAvailableOrNot.isPresent()) {
			throw new BookAlreadyExistException("Book with name \"" + book.getBookName() + "\" and ISBN no \""
					+ book.getIsbnNo() + "\" already exist!!");
		} else {
			return bookRepository.save(book);
		}
	}

	public Book deleteBookByBookId(int bookId) {
		Optional<Book> book = bookRepository.findById(bookId);

		if (!book.isPresent()) {
			throw new BookNotFoundException("Book data not found with id " + bookId + "!!");
		} else {
			if (isBookAllocatedToSomeone(bookId)) {
				throw new StudentHasSomeBookException(
						"Book with id " + bookId + " is allocated to someone, please deallocate them first!!");
			}
			Book bookDataToReturn = book.get();
			bookRepository.deleteById(bookId);
			return bookDataToReturn;
		}
	}

	public Boolean isBookAllocatedToSomeone(int bookId) {
		return studentBookRepository.findAll().stream().anyMatch(sb -> sb.getBookTaken().getBookId() == bookId);
	}

	public List<Student> getAllStudentsWhoomABookIsAllocated(int bookId) {
		List<Student> allStudents = getAllStudents();
		List<Student> student = new ArrayList<Student>();
		for (Student s : allStudents) {
			Optional<StudentBook> studentToStore = s.getBooksTakenByStudent().stream()
					.filter(sb -> sb.getBookTaken().getBookId() == bookId).findAny();
			if (studentToStore.isPresent()) {
				student.add(s);
			}
		}
		if (student.isEmpty()) {
			throw new BookNotAssignedToAnyoneException("Book with id " + bookId + " is not assigned to anyone!!");
		}
		return student;
	}

	public Student addStudent(Student student) {
		Optional<Student> checkStudentAvailableOrNot = studentRepository.findAll().stream()
				.filter(t -> t.getStudentEmail().equals(student.getStudentEmail())).findAny();
		if (checkStudentAvailableOrNot.isPresent()) {
			throw new StudentAlreadyRegisteredException(
					"Student with email " + student.getStudentEmail() + " already registered!!");
		} else {
			userInfoRepository.save(UserInfo.builder()
					.email(student.getStudentEmail())
					.password(passwordEncoder.encode(student.getStudentPassword()))
					.roles("ROLE_STUDENT").build());
			return studentRepository.save(student);
		}
	}

	public Boolean deleteStudentByStudentEmail(String studentEmail) {
		Optional<Student> student = studentRepository.findStudentByStudentEmail(studentEmail);
		Optional<UserInfo> studentInfo = userInfoRepository.findByEmail(studentEmail);
		
		if (student.isEmpty()) {
			throw new StudentNotFoundException("Student data not found with email " + studentEmail + "!!");
		} else {
			studentRepository.deleteById(student.get().getStudentId());
			userInfoRepository.deleteById(studentInfo.get().getUserId());
			return true;
		}
	}

	public Boolean allocateBookToAStudent(int bookId, int studentId) {

		Optional<Book> book = bookRepository.findById(bookId);
		Optional<Student> student = studentRepository.findById(studentId);

		if (book.isEmpty()) {
			throw new BookNotFoundException("Book data not found with book id " + bookId);
		}
		if (student.isEmpty()) {
			throw new StudentNotFoundException("Student data not found with student id " + studentId);
		}

		Optional<Student> checkData = studentRepository.findAll().stream()
				.filter(s -> s.getStudentId() == studentId
						&& s.getBooksTakenByStudent().stream().anyMatch(b -> b.getBookTaken().getBookId() == bookId))
				.findAny();

		if (checkData.isPresent()) {
			throw new BookAlreadyAssignedToStudentException(
					"Book with id " + bookId + " already assigned to student with id " + studentId);
		}
		Book bookData = book.get();
		Student studentData = student.get();
		// Checking book availability
		int currentToatlAvailabilityOfBook = bookData.getTotalAvailability();

		if (currentToatlAvailabilityOfBook <= 0) {
			throw new BookNotAvailableException(
					"Book with id " + bookData.getBookId() + " is not available for allocate");
		}

		bookData.setTotalAvailability(currentToatlAvailabilityOfBook - 1);

		Book bookToSaveInStudentBook = bookRepository.save(bookData);

		Date currentDate = Date.valueOf(LocalDate.now());
		Date dateAfter30Days = Date.valueOf(LocalDate.now().plusDays(30));

		StudentBook studentBook = StudentBook.builder().bookAllocationDate(currentDate)
				.bookAllocationEndDate(dateAfter30Days).bookTaken(bookToSaveInStudentBook).build();

		StudentBook studentBookToSave = studentBookRepository.save(studentBook);

		studentData.getBooksTakenByStudent().add(studentBookToSave);

		Student studentToSave = Student.builder().studentId(studentData.getStudentId())
				.studentEmail(studentData.getStudentEmail()).studentPassword(studentData.getStudentPassword())
				.booksTakenByStudent(studentData.getBooksTakenByStudent()).build();

		studentRepository.save(studentToSave);

		return true;
	}

	public Boolean deallocateBookFromAStudent(int bookId, int studentId) {

		Optional<Book> book = bookRepository.findById(bookId);
		Optional<Student> student = studentRepository.findById(studentId);

		if (book.isEmpty()) {
			throw new BookNotFoundException("Book data not found with book id " + bookId);
		}
		if (student.isEmpty()) {
			throw new StudentNotFoundException("Student data not found with student id " + studentId);
		}

		Book bookData = book.get();
		Student studentData = student.get();

		Optional<StudentBook> bookToRemove = studentData.getBooksTakenByStudent().stream()
				.filter(b -> b.getBookTaken().getBookId() == bookData.getBookId()).findAny();

		int currentToatlAvailabilityOfBook = bookData.getTotalAvailability();

		if (bookToRemove.isPresent()) {
			bookData.setTotalAvailability(currentToatlAvailabilityOfBook + 1);

			bookRepository.save(bookData);

			studentData.getBooksTakenByStudent().remove(bookToRemove.get());
			studentRepository.save(studentData);
			studentBookRepository.deleteById(bookToRemove.get().getStudentBookId());
			// book successfully removed
			return true;
		}

		throw new BookNotAllocatedToStudentException("Book with id " + bookData.getBookId() + "("
				+ bookData.getBookName() + ") is not allocated to Student with id " + studentData.getStudentId() + "("
				+ studentData.getStudentEmail() + ")");
	}

	public List<StudentBook> getAllBooksAllocatedToAStudent(int studentId) {
		Optional<Student> student = studentRepository.findById(studentId);
		if (student.isPresent()) {
			List<StudentBook> allBooks = student.get().getBooksTakenByStudent();
			if (allBooks.isEmpty()) {
				throw new NoBooksFoundException("No Books Found For student with id " + studentId);
			}
			return allBooks;
		} else {
			throw new StudentNotFoundException("Student data not found with student id " + studentId);
		}
	}

	public Date extendBookAllocationDateForAStudent(int bookId, int studentId) {

		Optional<Book> book = bookRepository.findById(bookId);
		Optional<Student> student = studentRepository.findById(studentId);

		if (book.isEmpty()) {
			throw new BookNotFoundException("Book data not found with book id " + bookId);
		}
		if (student.isEmpty()) {
			throw new StudentNotFoundException("Student data not found with student id " + studentId);
		}

		Student studentData = student.get();

		Date dateAfter30Days = Date.valueOf(LocalDate.now().plusDays(30));

		Optional<StudentBook> studentBook = studentData.getBooksTakenByStudent().stream()
				.filter(sb -> sb.getBookTaken().getBookId() == bookId).findAny();

		if (studentBook.isPresent()) {
			if (dateAfter30Days.equals(studentBook.get().getBookAllocationEndDate())) {
				System.out.println("Date is already extended for this book for this student");
				throw new SameDateExtentionRequestException("Date is already extended for this book for this student");
			}
			StudentBook sb = studentBook.get();
			sb.setBookAllocationEndDate(dateAfter30Days);
			studentBookRepository.save(sb);

			studentData.getBooksTakenByStudent().stream().filter(s -> s.getStudentBookId() == sb.getStudentBookId())
					.forEach(s -> s.setBookAllocationEndDate(dateAfter30Days));

			studentRepository.save(studentData);
		} else {
			throw new BookNotTakenException("Book with ID " + bookId + " is not taken by student with ID " + studentId);
		}

		return dateAfter30Days;
	}

	public Boolean isBookAllocationEnded(int studentBookId) {

		Optional<StudentBook> studentBook = studentBookRepository.findById(studentBookId);
		if (studentBook.isEmpty()) {
			throw new StudentBookDataNotFoundException("Studentbook data not found with id " + studentBookId);
		}

		return studentBook.get().getBookAllocationEndDate().before(Date.valueOf(LocalDate.now()));
	}

	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	public Boolean deleteStudentByStudentId(int studentId) {
		Optional<Student> student = studentRepository.findById(studentId);
		

		if (student.isEmpty()) {
			throw new StudentNotFoundException("Student data not found with id " + studentId + "!!");
		} else {
			Boolean isAnyBookTaken = student.get().getBooksTakenByStudent().isEmpty();
			if (!isAnyBookTaken) {
				throw new StudentHasSomeBookException(
						"Student with id " + studentId + " has taken some books. Please deallocate them first!!");
			}
			Optional<UserInfo> studentInfo = userInfoRepository.findByEmail(student.get().getStudentEmail());
			studentRepository.deleteById(student.get().getStudentId());
			userInfoRepository.deleteById(studentInfo.get().getUserId());
			return true;
		}
	}

	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}
}
