import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import classNames from "classnames/bind";
import { useContext } from "react";
import { StateContext } from "../../contexts/GlobalState";
import productsService from "../../services/productsService";
import LocalStorage from "../../contexts/LocalStorage";

import styles from "./CreateProduct.module.scss";

const cx = classNames.bind(styles);

const CreateProduct = () => {
    const { form } = Form.useForm();

    const { products, setProducts, uploadData, setUploadData } =
        useContext(StateContext);

    const normFile = (e) => {
        // const formData = new FormData();
        // formData.append("data", values);

        return e?.fileList;
    };
    const options = [
        {
            value: "sua-tang-can",
            label: "Sữa tăng cân",
        },
        {
            value: "ho-tro-giam-can",
            label: "Hỗ trợ giảm cân",
        },
        {
            value: "vitamin-khoang-chat",
            label: "Vitamin khoáng chất",
        },
        {
            value: "phu-kien-tap",
            label: "Phụ kiện tập",
        },
    ];

    const onCreateProduct = async (values) => {
        const token = await LocalStorage.getItem("users")?.accessToken;
        const res = await productsService.create(values, token);
        console.log(res);
        console.log(values);
    };

    return (
        <div className={cx("wrapper")}>
            <Form
                className={cx("form")}
                labelCol={{ span: 4 }}
                form={form}
                size="large"
                onFinish={onCreateProduct}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm!",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} name="name" />
                </Form.Item>
                <Form.Item label="Slug" name="slug">
                    <Select
                        options={options}
                        defaultValue="Chọn danh mục"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Qty" name="qty">
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input style={{ width: "100%" }} name="description" />
                </Form.Item>
                <Form.Item
                    label="Image "
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload listType="picture" action="/products/add-product">
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" block>
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateProduct;
