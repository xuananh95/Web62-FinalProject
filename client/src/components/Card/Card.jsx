import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, Pagination, Rate, Select, Space } from "antd";
import classNames from "classnames/bind";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useContext } from "react";

import styles from "./Card.module.scss";
import { StateContext } from "../../contexts/GlobalState";
import productsService from "../../services/productsService";

const cx = classNames.bind(styles);
const WheyProtein = () => {
    const { Meta } = Card;
    const { listsProduct, setListsProduct } = useContext(StateContext);

    useEffect(() => {
        (async function fetchApi() {
            const res = await productsService.getAllProducts();
            setListsProduct(res?.data.data);
        })();
    }, []);

    const renderCard =
        listsProduct &&
        listsProduct.map((el, key) => {
            return (
                <div key={key}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={el.image} />}
                    >
                        <Meta title={el.name} /> <Rate value={4} disabled />
                        <span> 250</span>
                        <p>{el.price} VNĐ</p>
                        <div className={cx("buy")}>
                            <Button type="primary" size="large" block>
                                <FontAwesomeIcon
                                    icon={faCartPlus}
                                    style={{ marginRight: "0.5rem" }}
                                />
                                Thêm giỏ hàng
                            </Button>
                            <Button
                                block
                                type="primary"
                                size="large"
                                style={{ marginTop: "0.5rem" }}
                            >
                                Mua ngay
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        });

    return (
        <div className={cx("wrapper")}>
            <div className={cx("sort")}>
                {" "}
                <Space size={10}>
                    <h3>Sắp xếp theo: </h3>
                    <Button size="large">Phổ biến</Button>
                    <Button size="large">Mới nhất</Button>
                    <Button size="large">Bán chạy</Button>
                    <Select
                        size="large"
                        defaultValue="price"
                        options={[
                            {
                                value: "price",
                                label: "Giá : Thấp đến Cao",
                            },
                            {
                                value: "lucy",
                                label: "Giá : Cao đến Thấp",
                            },
                        ]}
                    />
                    <Input.Search
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Search product ..."
                    />
                </Space>
            </div>

            <div className={cx("card")}>{renderCard}</div>
            <div className={cx("pagination")}>
                <Pagination showQuickJumper defaultCurrent={1} total={100} />
            </div>
        </div>
    );
};

export default WheyProtein;
