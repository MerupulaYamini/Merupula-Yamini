import React, { useState, useEffect, useCallback } from "react";
import { DatePicker, Input, Button } from "antd";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "day"));
  const [endDate, setEndDate] = useState(dayjs());
  const [localProducts, setLocalProducts] = useState([]);

  const location = useLocation();
  const { data, isLoading } = useProducts();

  useEffect(() => {
    if (location.state?.newProduct) {
      setLocalProducts((prev) => [location.state.newProduct, ...prev]);
    }
  }, [location.state]);

  const openModal = useCallback(() => setOpen(true), []);
  const handleSearch = useCallback((e) => setSearchTerm(e.target.value), []);

  const tableData = [...localProducts, ...(data?.products || [])];

  return (
    <div className="page-container">
      <h2 className="page-title">Product Listing</h2>

      <div className="filter-row">
        <DatePicker value={startDate} onChange={setStartDate} />
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          disabledDate={(d) => d && d < startDate}
        />
        <Input.Search
          placeholder="Search Product"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={openModal}>
          + Add Product
        </Button>
      </div>

      <ProductTable
        data={tableData}
        loading={isLoading}
        searchTerm={searchTerm}
      />

      <AddProductModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProductList;
