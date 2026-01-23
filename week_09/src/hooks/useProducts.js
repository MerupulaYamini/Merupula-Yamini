import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productAPI";

const useProducts = (filters) => { 
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    keepPreviousData: true,
  });
};

export default useProducts;

