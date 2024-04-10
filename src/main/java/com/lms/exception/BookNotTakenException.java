package com.lms.exception;

public class BookNotTakenException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BookNotTakenException(String msg) {
		super(msg);
	}

}
