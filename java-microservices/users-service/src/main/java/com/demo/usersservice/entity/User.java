package com.demo.usersservice.entity;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "users")
public class User {
	@Id
	private String id;

	@NotBlank(message = "Name is mandatory")
	private String name;

	@NotBlank(message = "DOB is mandatory")
	@Field(name = "birthDate")
	private String birthDate;
	
	private String username;
}
