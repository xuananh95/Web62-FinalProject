import React from "react";
import { Table, Typography } from "antd";
const { Text } = Typography;

const TableFood = ({ columns, foodbasket }) => (
  <>
    <Table
      columns={columns}
      dataSource={foodbasket}
      // pagination={true}
      pagination={{ pageSize: 6 }}
      summary={(foodbasket) => {
        // console.log(foodbasket);
        let totalQuantity = 0;
        let totalCalo = 0;
        let totalProtein = 0;
        let totalCarb = 0;
        let totalFat = 0;

        foodbasket.forEach(({ calo, protein, carb, fat, quantity }) => {
          totalQuantity += Number(quantity);
          totalCalo += (Number(calo) * Number(quantity)) / 100;
          totalProtein += (Number(protein) * Number(quantity)) / 100;
          totalCarb += (Number(carb) * Number(quantity)) / 100;
          totalFat += (Number(fat) * Number(quantity)) / 100;
        });
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
export default TableFood;
