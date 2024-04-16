package com.lms.exception;

public class BookNotAssignedToAnyoneException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public BookNotAssignedToAnyoneException(String msg) {
		super(msg);
	}

}
