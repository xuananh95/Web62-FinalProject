import {
  faRightLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  Input, InputNumber
} from "antd";
import classNames from "classnames/bind";

import { useState } from "react";
import styles from "./FoodItem.module.scss";

const cx = classNames.bind(styles);
const FoodItem = ({
  path,
  text,
  protein,
  carb,
  fat,
  calo,
  id,
  foodItem,
  foodbasket,
  setFoodbasket,
  setData,
  setTotalprotein,
  setTotalcarb,
  setTotalfat,
  totalprotein,
  totalcarb,
  totalfat,
}) => {
  //props

  //state&hooks
  const [foodvolume, setFoodvolume] = useState(100);
  const { Meta } = Card;

  //function

  const onChange = (value) => {
    setFoodvolume(value);
  };
  const onAddtofoodbasket = (product) => {
    let newCart = [];
    const searchIndexItem = foodbasket.findIndex(
      (item) => item.id === product.id
    );
    if (searchIndexItem === -1) {
      const newProduct = { ...product, quantity: foodvolume };
      newCart = [...foodbasket, newProduct];
    } else {
      newCart = [...foodbasket];
      newCart[searchIndexItem].quantity += foodvolume;
    }
    setFoodbasket(newCart);
    //logicchart-start
    const p =
      totalprotein + (Number(product.protein) * Number(foodvolume)) / 100;
    const c = totalcarb + (Number(product.carb) * Number(foodvolume)) / 100;
    const f = totalfat + (Number(product.fat) * Number(foodvolume)) / 100;

    setTotalprotein(p);
    setTotalcarb(c);
    setTotalfat(f);

    setData({
      labels: ["Protein", "Tinh bột", "Chất Béo"],
      datasets: [
        {
          label: "Tỉ lệ các chất chính",
          data: [
            (p / (p + c + f)) * 100,
            (c / (p + c + f)) * 100,
            (f / (p + c + f)) * 100,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            // "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            // "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    });
    //logicchart-end
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("card")}>
        <Card
          hoverable
          style={{ width: 320 }}
          cover={<img alt="example" src={path} />}
        >
          <Meta title={text} />
          {/* <p>{foodItem}</p> */}
          <div className={styles.fooditemRow}>
            <div className={styles.fooditemCol}>
              <div className="fooditem-protein">
                Protein: {((foodvolume / 100) * protein).toFixed(1)}g
              </div>
              <div className="fooditem-carb">
                Tinh bột: {((foodvolume / 100) * carb).toFixed(1)}g
              </div>
              <div className="fooditem-fat">
                Chất béo: {((foodvolume / 100) * fat).toFixed(1)}g
              </div>
            </div>

            <FontAwesomeIcon
              icon={faRightLeft}
              style={{ marginRight: "0.5rem" }}
            />
            <div className="fooditem-col">
              <div className="fooditem-calo">
                {((foodvolume / 100) * calo).toFixed(1)} calo
              </div>
            </div>
          </div>
          <div className={cx("buy")}>
            <Input.Group compact>
              <InputNumber
                style={{
                  // width: "calc(100% - 20px)",
                  width: "50%",
                }}
                min={50}
                max={10000}
                defaultValue={100}
                onChange={onChange}
              />
              <Button
                type="primary"
                style={{
                  // width: "calc(100% - 20px)",
                  width: "50%",
                }}
                onClick={() => onAddtofoodbasket(foodItem)}
              >
                Thêm món
              </Button>
            </Input.Group>
          </div>
        </Card>
      </div>
      {/* <div className={cx("pagination")}>
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </div> */}
    </div>
  );
};

export default FoodItem;
