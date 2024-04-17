package com.lms.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	
	@ExceptionHandler(UserAlredayExistException.class)
	public ResponseEntity<?> handleUserAlredayExistException(UserAlredayExistException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookNotAssignedToAnyoneException.class)
	public ResponseEntity<?> handleBookNotAssignedToAnyoneException(BookNotAssignedToAnyoneException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(StudentHasSomeBookException.class)
	public ResponseEntity<?> handleStudentHasSomeBookException(StudentHasSomeBookException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(NoBooksFoundException.class)
	public ResponseEntity<?> handleNoBooksFoundException(NoBooksFoundException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(SameDateExtentionRequestException.class)
	public ResponseEntity<?> handleSameDateExtentionRequestException(SameDateExtentionRequestException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookNotAllocatedToStudentException.class)
	public ResponseEntity<?> handleBookNotAllocatedToStudentException(BookNotAllocatedToStudentException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookAlreadyAssignedToStudentException.class)
	public ResponseEntity<?> handleBookAlreadyAssignedToStudentException(BookAlreadyAssignedToStudentException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookNotAvailableException.class)
	public ResponseEntity<?> handleBookNotAvailableException(BookNotAvailableException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookAlreadyExistException.class)
	public ResponseEntity<?> handleBookAlreadyExistException(BookAlreadyExistException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookNotFoundException.class)
	public ResponseEntity<?> handleBookNotFoundException(BookNotFoundException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(BookNotTakenException.class)
	public ResponseEntity<?> handleBookNotTakenException(BookNotTakenException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(StudentBookDataNotFoundException.class)
	public ResponseEntity<?> handleStudentBookDataNotFoundException(StudentBookDataNotFoundException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	

	@ExceptionHandler(TeacherAlreadyRegisteredException.class)
	public ResponseEntity<?> handleTeacherAlreadyRegisteredException(TeacherAlreadyRegisteredException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(StudentAlreadyRegisteredException.class)
	public ResponseEntity<?> handleStudentAlreadyRegisteredException(StudentAlreadyRegisteredException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(StudentNotFoundException.class)
	public ResponseEntity<?> StudentNotFoundException(StudentNotFoundException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(TeacherNotFoundException.class)
	public ResponseEntity<?> handleTeacherNotFoundException(TeacherNotFoundException e){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
		Map<String,String> response=new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error)->{
			String fieldName=((FieldError)error).getField();
			String message=error.getDefaultMessage();
			response.put(fieldName, message);
		});

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	}
}
