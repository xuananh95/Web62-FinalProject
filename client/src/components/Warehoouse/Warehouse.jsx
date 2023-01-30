import { Button, Form, Image, Space, Table } from "antd";
import classNames from "classnames/bind";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import productsService from "../../services/productsService";

import styles from "./Warehouse.module.scss";

const cx = classNames.bind(styles);

const Warehouse = () => {
    const { listsProduct, setListsProduct, products, setProducts } =
        useContext(StateContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        (async function fetchApi() {
            const res = await productsService.getAllProducts();
            setListsProduct(res?.data.data);
        })();
    }, []);

    const onDelete = async (product) => {
        const token = await LocalStorage.getItem("users")?.accessToken;
        await productsService.deleteProduct(product._id, token);
    };

    const onUpdate = async (product) => {
        const token = await LocalStorage.getItem("users")?.accessToken;
        const res = await productsService.updateProduct(product._id, token);
        const { __v, _id, ...other } = res?.data?.data.updatedProduct;
        setProducts(other);
        navigate("/dasboard/them-san-pham");
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            align: "center",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            align: "center",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            render: (url) => <Image width={"120px"} src={url} />,
            align: "center",
        },
        {
            title: "Giá",
            dataIndex: "price",
            align: "center",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            align: "center",
        },
        {
            title: "Hành động",
            align: "center",
            render: (_id) => (
                <Space>
                    <Button onClick={() => onUpdate(_id)}>Chỉnh sửa</Button>
                    <Button onClick={() => onDelete(_id)}>Xóa</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                className={cx("table")}
                columns={columns}
                dataSource={listsProduct}
                tableLayout="auto"
            />
        </>
    );
};

export default Warehouse;
