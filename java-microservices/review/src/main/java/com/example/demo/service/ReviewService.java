package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Review;
import com.example.demo.repo.ReviewRepo;

@Service
public class ReviewService {
	@Autowired
	ReviewRepo reviewRepo;
	
	public List<Review> findAll(){
		return reviewRepo.findAll();
	}
	
	public Review findById(String id) {
		Optional<Review> review = reviewRepo.findById(id);
		return review.orElseThrow();
	}
}
