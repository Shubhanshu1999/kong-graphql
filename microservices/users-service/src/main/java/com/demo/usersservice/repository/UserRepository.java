package com.demo.usersservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.demo.usersservice.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>  {

}
