import React, { memo, useMemo } from "react";
import { Table, Rate } from "antd";

const ProductTable = ({ data, loading, searchTerm }) => {
  const filteredData = useMemo(() => {
    return data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const categoryFilters = useMemo(() => {
    return [...new Set(data.map((item) => item.category))].map((cat) => ({
      text: cat,
      value: cat,
    }));
  }, [data]);

  const columns = useMemo(
    () => [
      {
        title: "Product Name",
        dataIndex: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
      },
      {
        title: "Category",
        dataIndex: "category",
        filters: categoryFilters,
        onFilter: (value, record) => record.category === value,
      },
      {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: "Rating",
        sorter: (a, b) => a.rating - b.rating,
        render: (_, record) => <Rate disabled value={record.rating} />,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        sorter: (a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(a.createdAt) - new Date(b.createdAt);
        },
        filters: [
          { text: "Has Date", value: "hasDate" },
          { text: "No Date", value: "noDate" },
        ],
        onFilter: (value, record) => {
          if (value === "hasDate") return !!record.createdAt;
          if (value === "noDate") return !record.createdAt;
          return true;
        },
        render: (date) => date || "—",
      },
    ],
    [categoryFilters]
  );

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={filteredData}
      loading={loading}
      pagination={{ pageSize: 6 }}
    />
  );
};

export default memo(ProductTable);
