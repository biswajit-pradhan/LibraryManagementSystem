package com.lms.exception;

public class BookNotAvailableException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BookNotAvailableException(String msg) {
		super(msg);
	}
}
