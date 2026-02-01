import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

/**
 * GET all products
 */
export const getProducts = async () => {
  const res = await axios.get(BASE_URL);

  //  Map backend fields → frontend expected fields
  return {
    products: res.data.map((p) => ({
      id: p.id,
      title: p.name,                 //  name → title
      category: p.category,
      price: p.price,
      rating: p.rating,
      createdAt: p.createdDate,      //  createdDate → createdAt
    })),
  };
};

/**
 * CREATE product
 */
export const createProduct = async (product) => {
  //  Convert frontend fields → backend DTO
  const payload = {
    name: product.title,     //  title → name
    category: product.category,
    price: product.price,
    rating: product.rating,
    description: product.description,
  };

  const res = await axios.post(BASE_URL, payload);

  //  Convert response back for UI
  return {
    id: res.data.id,
    title: res.data.name,
    category: res.data.category,
    price: res.data.price,
    rating: res.data.rating,
    createdAt: res.data.createdDate,
  };
};
