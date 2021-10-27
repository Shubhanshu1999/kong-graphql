package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	ProductService productService; 
	
	@GetMapping("/")
	public String hello() {
		return "Working";
	}
	
	@GetMapping("/product")
	public List<Product> findAllProducts(){
		return productService.findAll();
	}
	
	@GetMapping("/product/{upc}")
	public Product findByUPC(@PathVariable String upc) {
		return productService.findByUpc(upc);
		
	}
}
