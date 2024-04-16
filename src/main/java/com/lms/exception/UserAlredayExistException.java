package com.lms.exception;

public class UserAlredayExistException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public UserAlredayExistException(String msg) {
		super(msg);
	}

}
