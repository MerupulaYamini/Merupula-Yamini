package com.yamini.productmanager.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_descriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String description;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
