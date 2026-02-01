package com.yamini.productmanager.repository;

import com.yamini.productmanager.entity.ProductDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDescriptionRepository extends JpaRepository<ProductDescription, Long> {
    ProductDescription findByProductId(Long productId);
}
