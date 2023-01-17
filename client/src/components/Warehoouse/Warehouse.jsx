import { Button, Image, Space, Table } from "antd";
import classNames from "classnames/bind";

import styles from "./Warehouse.module.scss";

const cx = classNames.bind(styles);

const Warehouse = () => {
    const dataSourse = [
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2018/05/Now-Omega-3-200-vi%C3%AAn-280x280.jpg"
                />
            ),
            price: 2000000,
            qty: 200,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2018/05/Now-Omega-3-200-vi%C3%AAn-280x280.jpg"
                />
            ),
            price: 2000000,
            qty: 200,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2018/05/Now-Omega-3-200-vi%C3%AAn-280x280.jpg"
                />
            ),
            price: 2000000,
            qty: 200,
        },
        {
            name: "whey protein",
            image: (
                <Image
                    width={"120px"}
                    src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2018/05/Now-Omega-3-200-vi%C3%AAn-280x280.jpg"
                />
            ),
            price: 2000000,
            qty: 200,
        },
    ];

    const columns = [
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
        {
            title: "Hành động",
            render: () => (
                <Space>
                    <Button>Chỉnh sửa</Button>
                    <Button>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                className={cx("table")}
                columns={columns}
                dataSource={dataSourse}
                tableLayout="auto"
                pagination={"3"}
            />
        </>
    );
};

export default Warehouse;
