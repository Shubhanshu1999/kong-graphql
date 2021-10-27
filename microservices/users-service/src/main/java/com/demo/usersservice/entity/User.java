package com.demo.usersservice.entity;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
	@Id
	private String id;

	@NotBlank(message = "Name is mandatory")
	private String name;

	@NotBlank(message = "Address is mandatory")
	private String address;

	@NotBlank(message = "DOB is mandatory")
	private String dob;

	@NotBlank(message = "email is mandatory")
	private String email;
}
