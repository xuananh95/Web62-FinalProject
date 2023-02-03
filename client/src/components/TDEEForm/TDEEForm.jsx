import {
  Button, Form,
  Input, Modal, Select
} from "antd";
import React, { useState } from "react";
import { MIN_CAL_FEMALE, MIN_CAL_MALE } from "../../configs/constants";
import styles from "./TDEEForm.module.css";

export const TDEEForm = () => {
    //state
    const [componentSize, setComponentSize] = useState("default");
    const [bmi, setBmi] = useState(0);
    const [tdeevalue, setTdeevalue] = useState(0);
    const [bmirange, setBmirange] = useState("");
    const [safeMinCalories, setSafeMinCalories] = useState(0);
    const [form] = Form.useForm();

    //function
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = (values) => {
        const { age, gender, height, weight, practicefrequency, fat } = values;
        //logic

        setSafeMinCalories(gender === "F" ? MIN_CAL_FEMALE : MIN_CAL_MALE);
        const Leanbodymass = (100 - Number(fat)) * 0.01 * Number(weight);
        const Bmr = 21.6 * Leanbodymass + 370;
        const Tdeevalue = Math.round(Number(Bmr) * Number(practicefrequency));
        const Bmi = (Number(weight) / Number(height) / Number(height)) * 10000;

        setTdeevalue(Tdeevalue);
        setBmi(Bmi);
        if (Bmi < 18.5) {
            setBmirange("Thiếu Cân");
        } else if (Bmi < 25) {
            setBmirange("Khỏe Mạnh");
        } else if (Bmi < 30) {
            setBmirange("Thừa Cân");
        } else {
            setBmirange("Béo Phì");
        }

        console.log("Success:", values);
        setTimeout(() => {
            showModal();
        }, 500);
        onReset();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //variable

    return (
        <Form
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
                maxWidth: 600,
            }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label={<p style={{ color: "rgba(185, 178, 172)" }}>Tuổi</p>}
                name="age"
                rules={[
                    {
                        required: true,
                        message: "Please input your age!",
                    },
                ]}
                style={{ color: "rgba(185,178,172)" }}
                className={styles.rrrr}
            >
                <Input placeholder="Nhập tuổi của bạn" />
            </Form.Item>
            <Form.Item
                label={
                    <p style={{ color: "rgba(185, 178, 172)" }}>Giới Tính</p>
                }
                name="gender"
                rules={[
                    {
                        required: true,
                        message: "Please input your gender!",
                    },
                ]}
            >
                <Select placeholder="Chọn giới tính của bạn">
                    <Select.Option value="M">Nam</Select.Option>
                    <Select.Option value="F">Nữ</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label={
                    <p style={{ color: "rgba(185, 178, 172)" }}>Chiều Cao</p>
                }
                name="height"
                rules={[
                    {
                        required: true,
                        message: "Please input your height!",
                    },
                ]}
            >
                <Input placeholder="Nhập chiều cao của bạn" />
            </Form.Item>
            <Form.Item
                label={<p style={{ color: "rgba(185, 178, 172)" }}>Cân Nặng</p>}
                name="weight"
                rules={[
                    {
                        required: true,
                        message: "Please input your weight!",
                    },
                ]}
            >
                <Input placeholder="Nhập cân nặng của bạn" />
            </Form.Item>
            <Form.Item
                label={
                    <p style={{ color: "rgba(185, 178, 172)" }}>
                        Tần suất tập luyện
                    </p>
                }
                name="practicefrequency"
                rules={[
                    {
                        required: true,
                        message: "Please input your practice frequency!",
                    },
                ]}
            >
                <Select
                    placeholder="Lựa chọn tần suất tập luyện của bạn"
                    styles={{}}
                >
                    <Select.Option value="1.2">
                        Ít vận động(công việc văn phòng)
                    </Select.Option>
                    <Select.Option value="1.375">
                        Tập thể dục nhẹ(1-2 ngày/ tuần)
                    </Select.Option>
                    <Select.Option value="1.55">
                        Cường độ trung bình(3-5 ngày/ tuần)
                    </Select.Option>
                    <Select.Option value="1.725">
                        Cường độ cao(6-7 ngày/ tuần)
                    </Select.Option>
                    <Select.Option value="1.9">
                        Vận động viên(2 lần mỗi ngày)
                    </Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label={<p style={{ color: "rgba(185, 178, 172)" }}>Tỉ lệ mỡ</p>}
                name="fat"
                rules={[
                    {
                        required: true,
                        message: "Please input your fat!",
                    },
                ]}
            >
                <Input placeholder="Nhập tỉ lệ mỡ của bạn" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        marginLeft: "57%",
                        // width: "59%",
                    }}
                    block
                    size="large"
                >
                    Tính TDEE
                </Button>
                <Modal
                    title="Kết quả"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <h2 style={{ lineHeight: "2", color: "#1677ff" }}>
                        TDEE của bạn là : {tdeevalue}
                    </h2>
                    Chỉ số BMI của bạn là <b>{parseFloat(bmi.toFixed(1))}</b>,
                    bạn đang <b>{bmirange}</b>
                    <p style={{ lineHeight: "2" }}>
                        {" "}
                        Để duy trì cân nặng, hãy ăn <b>{tdeevalue}</b> calo mỗi
                        ngày.
                    </p>
                    <p style={{ lineHeight: "2" }}>
                        Để tăng 0,45 kg / tuần, hãy ăn <b>{tdeevalue + 500}</b>{" "}
                        calo mỗi ngày.
                    </p>
                    <p style={{ lineHeight: "2" }}>
                        Để tăng 0,9 kg / tuần, hãy ăn <b>{tdeevalue + 100}</b>{" "}
                        calo mỗi ngày.
                    </p>
                    <p style={{ lineHeight: "2" }}>
                        Để giảm 0,45 kg / tuần, hãy ăn <b>{tdeevalue - 500}</b>{" "}
                        calo mỗi ngày.
                    </p>
                    <p style={{ lineHeight: "2" }}>
                        Để giảm 0,9 kg / tuần, hãy ăn <b>{tdeevalue - 100}</b>{" "}
                        calo mỗi ngày.
                    </p>
                </Modal>
            </Form.Item>
        </Form>
    );
};
