package com.example.FullStackSpringBoot.exception;

public class ApiRequestException extends RuntimeException {
    public ApiRequestException(Throwable cause) {
        super(cause);
    }

    public ApiRequestException(String message) {
        super(message);
    }
}
