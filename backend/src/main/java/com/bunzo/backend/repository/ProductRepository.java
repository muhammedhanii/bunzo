package com.bunzo.backend.repository;

import com.bunzo.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    boolean existsByCategoryId(Long categoryId);
}
