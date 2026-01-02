import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Rate, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/productAPI";

const ConfirmProduct = () => {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  if (!product) return <p>No product data found.</p>;

  const mutation = useMutation({
    mutationFn: createProduct,
    
    onSuccess: (data) => {
      message.success("Product created successfully!");
      navigate("/", { state: { newProduct: data } });
    },
    onError: () => {
      message.error("Failed to create product");
    },
  });

  return (
    <div className="page-container confirm-card">
      <h2 className="page-title">Confirm Product</h2>

      <Card>
        <div><strong>Product Name:</strong> {product.title}</div>
        <div><strong>Category:</strong> {product.category}</div>
        <div><strong>Price:</strong> ₹ {product.price}</div>

        <div style={{ marginTop: 8 }}>
          <strong>Rating:</strong>
          <Rate disabled value={product.rating} />
        </div>

        <div style={{ marginTop: 8 }}>
          <strong>Description:</strong> {product.description}
        </div>
      </Card>

      <div className="btn-group">
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button
          type="primary"
          onClick={() => mutation.mutate(product)}
          loading={mutation.isLoading}
        >
          Confirm & Create
        </Button>
      </div>
    </div>
  );
};

export default ConfirmProduct;
