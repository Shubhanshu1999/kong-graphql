package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Product {
	private Integer upc;
	private String name;
	private Integer price;
	private Integer weight;
}
