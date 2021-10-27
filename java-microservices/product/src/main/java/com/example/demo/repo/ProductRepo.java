package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.Product;

public interface ProductRepo extends MongoRepository<Product, Integer>{
	public Product findByUpc(Integer upc);
}
