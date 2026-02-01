
package com.yamini.productmanager.service.impl;

import com.yamini.productmanager.dto.AddProductRequestDTO;
import com.yamini.productmanager.dto.ProductDTO;
import com.yamini.productmanager.entity.Product;
import com.yamini.productmanager.entity.ProductDescription;
import com.yamini.productmanager.exception.ProductNotFoundException;
import com.yamini.productmanager.repository.ProductDescriptionRepository;
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
    private final ProductDescriptionRepository descriptionRepository;
    private final ModelMapper modelMapper;

    @Override
    public ProductDTO createProduct(AddProductRequestDTO dto) {

        Product product = Product.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .rating(dto.getRating())
                .createdDate(LocalDate.now())
                .build();

        ProductDescription desc = ProductDescription.builder()
                .description(dto.getDescription())
                .product(product)
                .build();

        // set bidirectional relation
        product.setProductDescription(desc);

        Product saved = productRepository.save(product);

        return ProductDTO.builder()
                .id(saved.getId())
                .name(saved.getName())
                .category(saved.getCategory())
                .price(saved.getPrice())
                .rating(saved.getRating())
                .createdDate(saved.getCreatedDate())
                .build();
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public ProductDTO updateProduct(Long id, AddProductRequestDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        modelMapper.map(dto, product);
        Product updated = productRepository.save(product);


        ProductDescription desc = descriptionRepository.findByProductId(id);
        if(desc != null){
            desc.setDescription(dto.getDescription());
            descriptionRepository.save(desc);
        }

        return modelMapper.map(updated, ProductDTO.class);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        productRepository.delete(product);
    }
}
