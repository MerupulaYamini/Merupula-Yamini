package com.yamini.productmanager.service.impl;

import com.yamini.productmanager.dto.AddProductDescriptionRequestDTO;
import com.yamini.productmanager.dto.ProductDescriptionDTO;
import com.yamini.productmanager.entity.Product;
import com.yamini.productmanager.entity.ProductDescription;
import com.yamini.productmanager.exception.ProductNotFoundException;
import com.yamini.productmanager.repository.ProductDescriptionRepository;
import com.yamini.productmanager.repository.ProductRepository;
import com.yamini.productmanager.service.ProductDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductDescriptionServiceImpl implements ProductDescriptionService {

    private final ProductDescriptionRepository descriptionRepository;
    private final ProductRepository productRepository;

    @Override
    public ProductDescriptionDTO addDescription(AddProductDescriptionRequestDTO dto) {

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(dto.getProductId()));

        ProductDescription existing = descriptionRepository.findByProductId(dto.getProductId());

        // UPDATE if already exists
        if (existing != null) {
            existing.setDescription(dto.getDescription());
            descriptionRepository.save(existing);

            return ProductDescriptionDTO.builder()
                    .id(existing.getId())
                    .productId(product.getId())
                    .description(existing.getDescription())
                    .build();
        }

        // CREATE if not exists
        ProductDescription desc = ProductDescription.builder()
                .description(dto.getDescription())
                .product(product)
                .build();

        ProductDescription saved = descriptionRepository.save(desc);

        return ProductDescriptionDTO.builder()
                .id(saved.getId())
                .productId(product.getId())
                .description(saved.getDescription())
                .build();
    }

    @Override
    public ProductDescriptionDTO getByProductId(Long productId) {

        ProductDescription desc = descriptionRepository.findByProductId(productId);

        if (desc == null) {
            throw new ProductNotFoundException(productId);
        }

        return ProductDescriptionDTO.builder()
                .id(desc.getId())
                .productId(desc.getProduct().getId())
                .description(desc.getDescription())
                .build();
    }
}
