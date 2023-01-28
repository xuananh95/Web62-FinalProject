import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, InputNumber, Table } from "antd";
import classNames from "classnames/bind";

import styles from "./CartPage.module.scss";

const cx = classNames.bind(styles);

const CartPage = () => {
    const dataSourseCart = [
        {
            id: "1",
            image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc",
            name: "whey protein",
            price: 20000,
            qty: 8,
        },
        {
            id: "2",
            image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc",
            name: "whey protein",
            price: 20000,
            qty: 8,
        },
    ];

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
        },
        {
            title: "Số lượng",
            dataIndex: "qty",
            align: "center",
            render: (_, record) => {
                return <InputNumber value={record.qty} />;
            },
        },
        {
            align: "center",
            render: (_, record) => {
                return (
                    <FontAwesomeIcon
                        onClick={() => console.log(record.id)}
                        icon={faTrash}
                        className={cx("icon")}
                    />
                );
            },
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <h2>Giỏ hàng</h2>
            <div className={cx("form--cart")}>
                <Table
                    columns={columns}
                    dataSource={dataSourseCart}
                    pagination={false}
                    className={cx("table")}
                />
                <div className={cx("btn--cart")}>
                    <h2>Tổng: 22222222$</h2>
                    <Button
                        type="primary"
                        block
                        size="large"
                        className={cx("btn")}
                    >
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
