package com.yamini.productmanager.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDescriptionDTO {
    private Long id;
    private Long productId;
    private String description;
}
