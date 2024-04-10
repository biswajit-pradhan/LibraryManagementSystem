package com.lms.exception;

public class SameDateExtentionRequestException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public SameDateExtentionRequestException(String msg) {
		super(msg);
	}

}
