package com.demo.usersservice.service;

import java.util.List;

import com.demo.usersservice.entity.User;

public interface IUserService {

	void createUser(User user);

	List<User> findAllUsers();


	void updateUser(User user);

	User findUserById(String id);

}
