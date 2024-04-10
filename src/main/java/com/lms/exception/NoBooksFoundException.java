package com.lms.exception;

public class NoBooksFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public NoBooksFoundException(String msg) {
		super(msg);
	}

}
