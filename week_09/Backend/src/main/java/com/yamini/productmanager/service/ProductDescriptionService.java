package com.yamini.productmanager.service;

import com.yamini.productmanager.dto.AddProductDescriptionRequestDTO;
import com.yamini.productmanager.dto.ProductDescriptionDTO;

public interface ProductDescriptionService {
    ProductDescriptionDTO addDescription(AddProductDescriptionRequestDTO requestDTO);
    ProductDescriptionDTO getByProductId(Long productId);
}
