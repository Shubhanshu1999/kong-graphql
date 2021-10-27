package com.demo.usersservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.usersservice.entity.User;
import com.demo.usersservice.exceptions.UserNotFoundException;
import com.demo.usersservice.repository.UserRepository;

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	UserRepository userRepository;
	
	@Override
	public void createUser(User user) {
		userRepository.save(user);
		
	}

	@Override
	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User findUserById(String id) {
		Optional<User> user=userRepository.findById(id);
		return user.orElseThrow(UserNotFoundException::new);
	}

	@Override
	public void updateUser(User user) {
		userRepository.save(user);
		
	}

}
