import {
    Button,
    Form,
    Image,
    Input,
    InputNumber,
    notification,
    Select,
    Space,
    Upload,
} from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useContext } from "react";
import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import productsService from "../../services/productsService";

import styles from "./CreateProduct.module.scss";

const cx = classNames.bind(styles);

const CreateProduct = () => {
    const [form] = Form.useForm();

    const { uploadData, setUploadData, products, isUpdate, setIsUpdate } =
        useContext(StateContext);
    const [api, contextHolder] = notification.useNotification();
    console.log("products", products);

    useEffect(() => {
        form.setFieldsValue({
            name: products.name,
            description: products.description,
            slug: products.slug,
            price: products.price,
            quantity: products.quantity,
        });
    }, [isUpdate]);

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
        const formData = new FormData();
        formData.append("file", uploadData);
        const uploadImage = await productsService.uploadImage(formData, token);
        values.image = uploadImage?.data?.data?.url;
        values.slug += `-${Math.floor(Math.random() * 1000)}`;
        const result = await productsService.create(values, token);
        api.success({
            duration: 1.5,
            message: `${result?.data?.message}`,
        });

        form.resetFields();
    };

    const onUpdate = async (values) => {
        const token = await LocalStorage.getItem("users")?.accessToken;
        const result = await productsService.updateProduct(
            values,
            products._id,
            token
        );
        api.success({
            duration: 1.5,
            message: `${result?.data?.message}`,
        });
        form.resetFields();
    };

    const onReset = () => {
        form.resetFields();
        setIsUpdate(true);
    };

    return (
        <div className={cx("wrapper")}>
            {contextHolder}
            <Form
                className={cx("form")}
                labelCol={{ span: 4 }}
                form={form}
                size="large"
                onFinish={isUpdate ? onUpdate : onCreateProduct}
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
                <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn trường này!",
                        },
                    ]}
                >
                    <Select
                        options={options}
                        defaultValue="Chọn danh mục"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá sản phẩm!",
                        },
                        {
                            type: Number,
                            message: "Vui lòng nhập số!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số lượng sản phẩm!",
                        },
                        {
                            type: Number,
                            message: "Vui lòng nhập số!",
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả sản phẩm!",
                        },
                    ]}
                >
                    <Input style={{ width: "100%" }} name="description" />
                </Form.Item>
                <Form.Item
                    label="Image "
                    name="image"
                    before
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập hình ảnh sản phẩm!",
                        },
                        {
                            type: File,
                            message: "Vui lòng đúng file!",
                        },
                    ]}
                >
                    <Input
                        type="file"
                        onChange={(e) => setUploadData(e.target.files[0])}
                    />
                </Form.Item>

                <Form.Item label=" ">
                    {!isUpdate ? (
                        <Button type="primary" htmlType="submit" block>
                            Thêm sản phẩm
                        </Button>
                    ) : (
                        <Space>
                            <Button type="primary" htmlType="submit" block>
                                Cập nhập
                            </Button>
                            <Button type="primary" onClick={onReset} block>
                                Reset
                            </Button>
                        </Space>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateProduct;
