package com.yamini.productmanager.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddProductDescriptionRequestDTO {
    private Long productId;
    private String description;
}
