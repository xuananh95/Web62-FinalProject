import React, { useEffect } from "react";
import { Table, Typography } from "antd";
import LocalStorage from "../../contexts/LocalStorage";
import { useState } from "react";
const { Text } = Typography;
const columns = [
  {
    title: "Tên",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "Khối Lượng",
    dataIndex: "quantity",
    key: "quantity",
    render: (quantity) => <p>{quantity}g</p>,
  },
  {
    title: "Calo",
    dataIndex: "calo",
    key: "calo",

    render: (calo, quantity) => <p>{(+calo * +quantity.quantity) / 100}</p>,
  },
  {
    title: "Protein",
    dataIndex: "protein",
    key: "protein",
    render: (protein, quantity) => (
      <p>{(+protein * +quantity.quantity) / 100}</p>
    ),
  },
  {
    title: "Tinh Bột",
    dataIndex: "carb",
    key: "carb",

    render: (carb, quantity) => <p>{(+carb * +quantity.quantity) / 100}</p>,
  },
  {
    title: "Chất Béo",
    dataIndex: "fat",
    key: "fat",

    render: (fat, quantity) => <p>{(+fat * +quantity.quantity) / 100}</p>,
  },
];

const SavedFood = () => {
  const [savedFoodTable, setSavedFoodTable] = useState([]);
  const user = LocalStorage.getItem("users").other._id;

  console.log(savedFoodTable);

  useEffect(() => {
    const food = LocalStorage.getItem(`id${user}`);
    setSavedFoodTable(food);
  }, []);
  console.log("add", savedFoodTable);
  return (
    <>
      <Table
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={savedFoodTable}
      />
    </>
  );
};
export default SavedFood;
