import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export const getProducts = async (params = {}) => {
  const res = await axios.get(BASE_URL, { params
    /*{: {
    limit: 5,
  }, }*/});
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(`${BASE_URL}/add`, product);
  return res.data;
};
