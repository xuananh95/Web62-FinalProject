import { Button, Image, Space, Table } from "antd";
import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import productsService from "../../services/productsService";

import styles from "./Warehouse.module.scss";

const cx = classNames.bind(styles);

const Warehouse = () => {
    const { listsProduct, setListsProduct, setIsUpdate, setProducts } =
        useContext(StateContext);
    const navigate = useNavigate();

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
        const res = await productsService.findUpdateProduct(product._id);
        const { __v, ...other } = res?.data?.data;
        setProducts(other);
        navigate("/dasboard/them-san-pham");
        setIsUpdate(true);
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
            render: (url) => <Image width={"150px"} src={url} />,
            align: "center",
        },
        { title: "Giá", dataIndex: "price", align: "center" },
        { title: "Số lượng", dataIndex: "quantity", align: "center" },
        {
            title: "Hành động",
            align: "center",
            render: (_id) => (
                <Space>
                    <Button size="large" onClick={() => onUpdate(_id)}>
                        Chỉnh sửa
                    </Button>
                    <Button danger size="large" onClick={() => onDelete(_id)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                size="large"
                className={cx("table")}
                columns={columns}
                dataSource={listsProduct}
                tableLayout="auto"
            />
        </>
    );
};

export default Warehouse;
