import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Pagination, Rate } from "antd";
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import { addToCart, updateCart } from "../../contexts/Redux/CartSlice";
import productsService from "../../services/productsService";
import Search from "../Search/Search";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const WheyProtein = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { Meta } = Card;
    const {
        listsProduct,
        setListsProduct,
        totalPage,
        setTotalPage,
        currentPage,
        setCurrentPage,
        cartId,
    } = useContext(StateContext);
    const users = LocalStorage.getItem("users")?.other;
    useEffect(() => {
        (async function fetchApi() {
            const res = await productsService.getAllProducts(currentPage);
            setListsProduct(res?.data.data.products);
            setTotalPage(res?.data.data.productCount);
            navigate(`/product?page=${currentPage}`);
        })();
    }, [currentPage]);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const onAddToCart = (product) => {
        const searchIndexCart = LocalStorage.getItem(cartId).findIndex(
            (item) => item._id === product._id
        );

        if (searchIndexCart === -1) {
            dispatch(addToCart({ ...product, quantity: 1 }));
        } else {
            dispatch(updateCart({ searchIndexCart, type: "up" }));
        }
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
                            <Button
                                type="primary"
                                size="large"
                                block
                                disabled={
                                    users?.role === "ADMIN" ? true : false
                                }
                                onClick={() => onAddToCart(el)}
                            >
                                <FontAwesomeIcon
                                    icon={faCartPlus}
                                    style={{ marginRight: "0.5rem" }}
                                />
                                Thêm giỏ hàng
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        });

    return (
        <div className={cx("wrapper")}>
            <Search />
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
