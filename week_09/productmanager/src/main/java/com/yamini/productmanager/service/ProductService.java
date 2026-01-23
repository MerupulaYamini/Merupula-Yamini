package com.yamini.productmanager.service;

import com.yamini.productmanager.dto.AddProductRequestDTO;
import com.yamini.productmanager.dto.ProductDTO;

import java.util.List;

public interface ProductService {

    ProductDTO createProduct(AddProductRequestDTO requestDTO);

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(Long id);

    ProductDTO updateProduct(Long id, AddProductRequestDTO requestDTO);

    void deleteProduct(Long id);
}
