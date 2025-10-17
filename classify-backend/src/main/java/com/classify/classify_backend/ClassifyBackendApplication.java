package com.classify.classify_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.classify")
public class ClassifyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClassifyBackendApplication.class, args);
	}

}
