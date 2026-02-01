package com.yamini.productmanager.controller;

import com.yamini.productmanager.dto.AddProductDescriptionRequestDTO;
import com.yamini.productmanager.dto.ProductDescriptionDTO;
import com.yamini.productmanager.service.ProductDescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product-descriptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductDescriptionController {
    private final ProductDescriptionService service;

    @PostMapping
    public ResponseEntity<ProductDescriptionDTO> add(@RequestBody AddProductDescriptionRequestDTO dto){
        return ResponseEntity.ok(service.addDescription(dto));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDescriptionDTO> getByProduct(@PathVariable Long productId){
        return ResponseEntity.ok(service.getByProductId(productId));
    }
}
