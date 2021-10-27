package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Review;
import com.example.demo.service.ReviewService;

@RestController
public class ReviewsController {
	
	@Autowired
	ReviewService reviewService; 
	
	@GetMapping("/")
	public String hello() {
		return "Working.......";
	}
	
	@GetMapping("/review")
	public List<Review> findAllReviews(){
		return reviewService.findAll();
	}
	
	@GetMapping("/review/{id}")
	public Review findById(@PathVariable String id) {
		return reviewService.findById(id);
		
	}
}
