import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Table } from "antd";
import classNames from "classnames/bind";

import styles from "./CartPage.module.scss";

const cx = classNames.bind(styles);

const CartPage = () => {
    const dataSourseCart = [
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTwFkngGuAph9Q5OIW9nSXt9KWPpGjAn0P_Js2qgwMCuA7R_IIoUVYT2toFMSXMn32wxr1_pK91Q&usqp=CAc"
                />
            ),
            price: 20000,
            qty: 2,
        },
    ];

    const columnsCart = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
        },
        {
            title: "Giá",
            dataIndex: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "qty",
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <Table
                className={cx("table")}
                columns={columnsCart}
                dataSource={dataSourseCart}
                pagination={false}
                rowSelection
            />
            <div className={cx("btn--cart")}>
                <h2>Tổng: 22222222$</h2>
                <Button type="primary" size="large">
                    Thanh toán
                </Button>
            </div>
        </div>
    );
};

export default CartPage;
