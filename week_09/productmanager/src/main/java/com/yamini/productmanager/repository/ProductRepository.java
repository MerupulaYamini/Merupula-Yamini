package com.yamini.productmanager.repository;

import com.yamini.productmanager.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
