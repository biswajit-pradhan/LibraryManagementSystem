package com.lms.exception;

public class StudentBookDataNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public StudentBookDataNotFoundException(String msg) {
		super(msg);
	}
}
