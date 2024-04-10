package com.lms.exception;

public class BookAlreadyExistException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public BookAlreadyExistException(String exception) {
		super(exception);
	}

}