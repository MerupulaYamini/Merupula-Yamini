package com.yamini.productmanager.service.impl;

import com.yamini.productmanager.dto.AddProductRequestDTO;
import com.yamini.productmanager.dto.ProductDTO;
import com.yamini.productmanager.entity.Product;
import com.yamini.productmanager.exception.ProductNotFoundException;
import com.yamini.productmanager.repository.ProductRepository;
import com.yamini.productmanager.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public ProductDTO createProduct(AddProductRequestDTO requestDTO) {
        Product product = modelMapper.map(requestDTO, Product.class);
        product.setCreatedDate(LocalDate.now());

        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public ProductDTO updateProduct(Long id, AddProductRequestDTO requestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        modelMapper.map(requestDTO, product);
        Product updated = productRepository.save(product);
        return modelMapper.map(updated, ProductDTO.class);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        productRepository.delete(product);
    }
}
