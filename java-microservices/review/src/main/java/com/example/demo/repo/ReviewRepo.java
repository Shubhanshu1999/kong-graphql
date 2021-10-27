package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.Review;

public interface ReviewRepo extends MongoRepository<Review, String>{
	public Optional<Review> findById(String id);
}
