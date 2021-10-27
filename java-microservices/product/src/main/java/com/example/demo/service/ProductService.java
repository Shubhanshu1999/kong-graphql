package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.example.demo.repo.ProductRepo;

@Service
public class ProductService {
	@Autowired
	ProductRepo productRepo;
	
	public List<Product> findAll(){
		return productRepo.findAll();
	}
	
	public Product findByUpc(Integer upc) {
		return productRepo.findByUpc(upc);
	}
	
	public Product save() {
		return productRepo.insert(new Product());
	}
}
