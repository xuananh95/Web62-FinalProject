import { Button, Form, Input, Modal, notification } from "antd";
import classNames from "classnames/bind";
import React, { useContext } from "react";
import { StateContext } from "../../contexts/GlobalState";

import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authSevices from "../../services/authServices";
import LocalStorage from "../../contexts/LocalStorage";
import styles from "./SignInPage.module.scss";

const cx = classNames.bind(styles);

const SignInPage = () => {
    const {
        isModalSignIn,
        setIsModalSignIn,
        formLogin,
        setFormLogin,
        setIsLogined,
    } = useContext(StateContext);
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const handleOk = async (values) => {
        try {
            const res = await authSevices.login(values);
            LocalStorage.setItem("users", res?.data.data);
            api.success({
                duration: 1.5,
                message: `${res?.data.message}`,
            });

            form.resetFields();

            setTimeout(() => {
                setIsModalSignIn(false);
                setIsLogined(true);
            }, 1000);
        } catch (error) {
            api.error({
                description: 1.5,
                message: error,
            });
        }
    };

    const handleCancel = () => {
        setIsModalSignIn(false);
    };
    return (
        <>
            {contextHolder}
            <Modal
                open={isModalSignIn}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[]}
                className={cx("wrapper")}
            >
                <h2>Sign In</h2>
                <Form
                    className={cx("form")}
                    onFinish={handleOk}
                    form={form}
                    size="large"
                >
                    <Form.Item
                        name={"email"}
                        rules={[
                            {
                                type: "email",
                                message:
                                    "Email nhập không đúng định dạng! VD:user@gmail.com",
                            },
                            {
                                required: true,
                                message: "Vui lòng nhập email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<FontAwesomeIcon icon={faEnvelope} />}
                            placeholder="Email"
                            type="email"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền mật khẩu!",
                            },
                            {
                                pattern:
                                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                                message:
                                    "Mật khẩu phải có 1 kí tự viết hoa, 1 số, 1 kí tự đặc biệt!",
                            },
                        ]}
                    >
                        <Input.Password
                            minLength={"8"}
                            prefix={<FontAwesomeIcon icon={faKey} />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign In
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="link" block>
                            Forgot pasword?
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SignInPage;
