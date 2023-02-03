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
const user = LocalStorage.getItem("users").other;
// const [savedFoodTable, setSavedFoodTable] = useState([]);
// useEffect(() => {
//     const food = LocalStorage.getItem(user._id);
//     setSavedFoodTable(food);
// }, [user._id]);

const SavedFood = () => (
    <>
        <Table
            columns={columns}
            // dataSource={savedFoodTable}
            pagination={true}
            pageSize={7}
            summary={(savedFoodTable) => {
                let totalQuantity = 0;
                let totalCalo = 0;
                let totalProtein = 0;
                let totalCarb = 0;
                let totalFat = 0;

                savedFoodTable.forEach(
                    ({ calo, protein, carb, fat, quantity }) => {
                        totalQuantity += Number(quantity);
                        totalCalo += (Number(calo) * Number(quantity)) / 100;
                        totalProtein +=
                            (Number(protein) * Number(quantity)) / 100;
                        totalCarb += (Number(carb) * Number(quantity)) / 100;
                        totalFat += (Number(fat) * Number(quantity)) / 100;
                    }
                );
                return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>
                                <b>Tổng</b>{" "}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Text>
                                    <b>{totalQuantity}</b>
                                </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>
                                <Text>
                                    <b>{parseFloat(totalCalo.toFixed(1))}</b>
                                </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>
                                <Text>
                                    <b>{parseFloat(totalProtein.toFixed(1))}</b>
                                </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>
                                <Text>
                                    <b>{parseFloat(totalCarb.toFixed(1))}</b>
                                </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5}>
                                <Text>
                                    <b>{parseFloat(totalFat.toFixed(1))}</b>
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }}
        />
    </>
);
export default SavedFood;
