package com.lms.exception;

public class StudentHasSomeBookException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public StudentHasSomeBookException(String msg) {
		super(msg);
	}

}
