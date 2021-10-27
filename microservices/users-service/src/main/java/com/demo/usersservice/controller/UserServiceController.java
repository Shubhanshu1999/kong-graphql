package com.demo.usersservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.usersservice.entity.User;
import com.demo.usersservice.service.IUserService;

@RestController
public class UserServiceController {
	@Autowired
	IUserService userServiceImpl;
	
	@PostMapping("/user")
	public void createUser(@RequestBody User user) {
		userServiceImpl.createUser(user);
	}
	
	@GetMapping("/user")
	public List<User> getAllUsers(){
		return userServiceImpl.findAllUsers();
	}
	
	@GetMapping("/user/{id}")
	public User getUserById(@PathVariable String id) {
		return userServiceImpl.findUserById(id);
	}
	
	@PutMapping("/plan/{id}")
	public void updateUser(@RequestBody User user, @PathVariable String id) {
		user.setId(id);
		userServiceImpl.updateUser(user);
	}
}
