package com.yamini.productmanager.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddProductRequestDTO {

    private String name;
    private String category;
    private Double price;
    private Double rating;
    private String description;
}
