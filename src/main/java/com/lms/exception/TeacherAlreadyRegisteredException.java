package com.lms.exception;

public class TeacherAlreadyRegisteredException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public TeacherAlreadyRegisteredException(String exception) {
		super(exception);
	}

}