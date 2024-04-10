package com.lms.exception;

public class BookNotAllocatedToStudentException  extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public BookNotAllocatedToStudentException(String msg) {
		super(msg);
	}

}
