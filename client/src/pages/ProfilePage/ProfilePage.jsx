import { Table } from "antd";
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import SavedFood from "../../components/SavedFood/SavedFood";
import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import productsService from "../../services/productsService";

import styles from "./ProfilePage.module.scss";

const cx = classNames.bind(styles);

const ProfilePage = () => {
    const { isReload, setIsReload } = useContext(StateContext);

    const users = LocalStorage.getItem("users");
    useEffect(() => {
        (async function fetch() {
            const res = await productsService.getOrderByUser(
                users?.accessToken
            );
            setIsReload([...res?.data?.data]);
        })();
    }, []);

    const renderHistory = isReload.map((items, index) => {
        return {
            STT: index,
            items: items.items,
            total: items.totalPrice,
            created: items.dateCreated,
        };
    });

    const colums2 = [
        {
            dataIndex: "product",
            render: (product) => <p>{product.name}</p>,
        },
        {
            dataIndex: "quantity",
            render: (quantity) => <p>SL: {quantity}</p>,
        },
    ];

    const columns = [
        {
            title: "STT",
            dataIndex: "STT",
        },
        {
            title: "Sản phẩm",
            dataIndex: "items",
            render: (items) => (
                <Table
                    bordered={true}
                    dataSource={items}
                    pagination={false}
                    columns={colums2}
                />
            ),
        },
        {
            title: "Đã thanh toán",
            dataIndex: "total",
            render: (total) => (
                <p>
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(total)}
                </p>
            ),
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "created",
        },
    ];
    return (
        <div className={cx("wrapper")}>
            <div className={cx("information")}>
                <h2>Thông tin cá nhân</h2>
                <h4>Tên: {users?.other.username}</h4>
                <h4>Email: {users?.other.email}</h4>
                <h4>Số điện thoại: {users?.other.phoneNumber}</h4>
                <h4>Địa chỉ: {users?.other.address}</h4>
            </div>
            <hr />
            <div>
                <h2>Lịch sử mua hàng</h2>
                <Table
                    className={cx("table")}
                    dataSource={renderHistory}
                    bordered={true}
                    columns={columns}
                    pagination={{ pageSize: 3 }}
                />
            </div>
            <hr />
            <div>
                <h2>Lịch sử món ăn</h2>
                <SavedFood />
            </div>
        </div>
    );
};

export default ProfilePage;
