package com.lms.exception;

public class BookAlreadyAssignedToStudentException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public BookAlreadyAssignedToStudentException(String msg) {
		super(msg);
	}

}
