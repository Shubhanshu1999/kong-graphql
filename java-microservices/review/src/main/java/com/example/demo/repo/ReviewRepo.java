package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.Review;

public interface ReviewRepo extends MongoRepository<Review, String>{
	public Review findById(Integer id);
}
