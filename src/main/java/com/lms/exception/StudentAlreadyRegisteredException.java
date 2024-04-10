package com.lms.exception;

public class StudentAlreadyRegisteredException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public StudentAlreadyRegisteredException(String exception) {
		super(exception);
	}

}