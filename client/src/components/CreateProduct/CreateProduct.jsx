import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import classNames from "classnames/bind";

import styles from "./CreateProduct.module.scss";

const cx = classNames.bind(styles);

const CreateProduct = () => {
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
    return (
        <>
            <Form className={cx("wrapper")} labelCol={{ span: 2 }}>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Slug" name="slug">
                    <Select options={options} defaultValue="Chọn danh mục" />
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Qty" name="qty">
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Image " name="image">
                    <Upload listType="picture">
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                </Form.Item>
                <Button type="primary" block>
                    Thêm sản phẩm
                </Button>
            </Form>
        </>
    );
};

export default CreateProduct;
