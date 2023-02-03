import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Image,
    Input,
    InputNumber,
    notification,
    Radio,
    Space,
    Table,
    Tooltip,
} from "antd";
import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import { deleteCart, isPaid, updateCart } from "../../contexts/Redux/CartSlice";
import productsService from "../../services/productsService";

import styles from "./CartPage.module.scss";

const cx = classNames.bind(styles);

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [api, contextHolder] = notification.useNotification();
    const today = new Date();
    var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    const [isPay, setIsPay] = useState("monney");
    const carts = useSelector((state) => state.cart);
    const { cartId } = useContext(StateContext);
    const users = LocalStorage.getItem("users");
    const TotalPrice = LocalStorage.getItem(cartId).reduce(
        (prev, curr) => prev + curr.price * curr.quantity,
        0
    );

    const productItem = carts.map((item) => {
        return {
            product: item._id,
            qty: item.quantity,
        };
    });

    const onIncrease = (id) => {
        const searchIndexCart = carts.findIndex((item) => item._id === id);
        dispatch(updateCart({ searchIndexCart, type: "up" }));
    };
    const onDecrease = (id) => {
        const searchIndexCart = carts.findIndex((item) => item._id === id);
        dispatch(updateCart({ searchIndexCart, type: "down" }));
    };

    const onChange = (values, id) => {
        const searchIndexCart = carts.findIndex((item) => item._id === id);
        dispatch(updateCart({ searchIndexCart, type: "input", value: values }));
    };

    const onDeleteCart = (id) => {
        const count = carts.findIndex((item) => item._id === id);
        dispatch(deleteCart({ count }));
    };

    const onPay = async () => {
        const data = {
            items: productItem,
            totalPrice: TotalPrice,
            dateCreated: date,
            isPaid: isPay === "monney" ? false : true,
            shippingAddress: users?.other.address,
        };

        const token = users?.accessToken;
        const res = await productsService.addOrder(data, token);
        api.success({
            duration: 1.5,
            message: `${res?.data.message}`,
        });
        dispatch(isPaid({ length: carts.length }));
        setTimeout(() => {
            navigate("/product?page=1");
        }, 1500);
    };

    const onChangePay = (e) => {
        setIsPay(e.target.value);
    };

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            align: "center",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            align: "center",
            render: (_, record) => {
                return <Image width={100} src={record.image} />;
            },
        },
        {
            title: "Giá",
            dataIndex: "price",
            align: "center",
            render: (price) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(price),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            align: "center",
            render: (_, record) => {
                return (
                    <Space>
                        <Button onClick={() => onDecrease(record._id)}>
                            -
                        </Button>
                        <InputNumber
                            max={1000}
                            value={record.quantity}
                            onChange={(e) => onChange(e, record._id)}
                        />

                        <Button onClick={() => onIncrease(record._id)}>
                            +
                        </Button>
                    </Space>
                );
            },
        },
        {
            align: "center",
            render: (_, record) => {
                return (
                    <FontAwesomeIcon
                        onClick={() => onDeleteCart(record._id)}
                        icon={faTrash}
                        className={cx("icon")}
                    />
                );
            },
        },
    ];

    return (
        <>
            {contextHolder}
            <div className={cx("wrapper")}>
                <h2>Giỏ hàng</h2>
                <div className={cx("form--cart")}>
                    <Table
                        columns={columns}
                        dataSource={LocalStorage.getItem(cartId)}
                        pagination={true}
                        className={cx("table")}
                        scroll={100}
                    />
                    <div className={cx("btn--cart")}>
                        <div>
                            <h3>Tên:</h3>
                            <Input value={users?.other.username} />
                            <h3>Số điện thoại:</h3>
                            <Input
                                type="Number"
                                value={users?.other.phoneNumber}
                            />
                            <h3>Địa chỉ:</h3>
                            <Input value={users?.other.address} />
                            <h3>Chọn phương thức thanh toán:</h3>
                            <Radio.Group onChange={onChangePay} value={isPay}>
                                <Radio value={"monney"}>
                                    <Tooltip title="Thanh toán bằng tiền mặt">
                                        <Image
                                            preview={false}
                                            width={90}
                                            src="data:image/png;base64,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"
                                        />
                                    </Tooltip>
                                </Radio>
                                <Radio value={"debit"}>
                                    <Tooltip title="Thanh toán bằng thẻ ngân hàng">
                                        <Image
                                            preview={false}
                                            width={80}
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ100Famsv9SS6po1Mgq-D2pMqgZxBWKwzEKQ&usqp=CAU"
                                        />
                                    </Tooltip>
                                </Radio>
                                <Radio value={"mastercard"}>
                                    <Tooltip title="Thanh toán bằng thẻ ghi nợ Mastercard">
                                        <Image
                                            preview={false}
                                            width={100}
                                            src="https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135018-mastercard_82253.png"
                                        />
                                    </Tooltip>
                                </Radio>
                                <Radio value={"visacard"}>
                                    <Tooltip title="Thanh toán bằng thẻ ghi nợ Visa">
                                        <Image
                                            preview={false}
                                            width={100}
                                            src="https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135017-visa_82256.png"
                                        />
                                    </Tooltip>
                                </Radio>
                            </Radio.Group>
                        </div>

                        <div>
                            <h2>
                                Tổng:{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(TotalPrice)}{" "}
                            </h2>
                            <Button
                                type="primary"
                                block
                                size="large"
                                className={cx("btn")}
                                onClick={onPay}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
