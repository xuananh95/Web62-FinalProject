import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, Pagination, Rate, Select, Space } from "antd";
import classNames from "classnames/bind";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";

import styles from "./Card.module.scss";
import { StateContext } from "../../contexts/GlobalState";
import productsService from "../../services/productsService";

const cx = classNames.bind(styles);
const WheyProtein = () => {
    const { Meta } = Card;
    const { listsProduct, setListsProduct } = useContext(StateContext);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        (async function fetchApi() {
            const res = await productsService.getAllProducts(currentPage);
            setListsProduct(res?.data.data.products);
            setTotalPage(res?.data.data.productCount);
        })();
    }, [currentPage]);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

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
                        <p>
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(el.price)}{" "}
                        </p>
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
                        placeholder="Tìm kiếm sản phẩm ..."
                    />
                </Space>
            </div>

            <div className={cx("card")}>{renderCard}</div>
            <div className={cx("pagination")}>
                <Pagination
                    current={currentPage}
                    onChange={onChangePage}
                    defaultCurrent={1}
                    total={totalPage}
                    style={{ fontSize: "1rem" }}
                />
            </div>
        </div>
    );
};

export default WheyProtein;
