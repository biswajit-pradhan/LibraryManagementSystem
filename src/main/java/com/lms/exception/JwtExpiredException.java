package com.lms.exception;

public class JwtExpiredException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public JwtExpiredException(String msg) {
		super(msg);
	}
}
