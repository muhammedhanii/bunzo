package com.bunzo.backend.service;

import com.bunzo.backend.dto.ProductRequest;
import com.bunzo.backend.entity.Category;
import com.bunzo.backend.entity.Product;
import com.bunzo.backend.exception.ResourceNotFoundException;
import com.bunzo.backend.repository.CategoryRepository;
import com.bunzo.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getProducts(Long categoryId) {
        if (categoryId == null) {
            return productRepository.findAll();
        }
        return productRepository.findByCategoryId(categoryId);
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public Product create(ProductRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.categoryId()));
        Product product = new Product();
        map(request, product, category);
        return productRepository.save(product);
    }

    public Product update(Long id, ProductRequest request) {
        Product product = getProduct(id);
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.categoryId()));
        map(request, product, category);
        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    private void map(ProductRequest request, Product product, Category category) {
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setImageUrl(request.imageUrl());
        product.setCategory(category);
        product.setFeatured(request.featured());
    }
}
