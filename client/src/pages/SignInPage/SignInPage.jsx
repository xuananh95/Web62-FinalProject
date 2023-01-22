import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import classNames from "classnames/bind";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../contexts/GlobalState";

import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SignInPage.module.scss";
import authSevices from "../../services/authServices";

const cx = classNames.bind(styles);

const SignInPage = () => {
    const { isModalOpen, setIsModalOpen, formLogin, setFormLogin } =
        useContext(StateContext);
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate();

    const handleOk = async () => {
        try {
            const res = await authSevices.login(formLogin);

            api.success({
                duration: 1.5,
                message: `${res?.data.message}`,
            });

            form.resetFields();

            setTimeout(() => {
                setIsModalOpen(false);
                navigate("/", { replace: true });
            }, 1000);
        } catch (error) {
            api.error({
                description: 1.5,
                message: error,
            });
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/");
    };
    return (
        <>
            {contextHolder}
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[]}
                className={cx("wrapper")}
            >
                <h2>Sign In</h2>
                <Form className={cx("form")} onFinish={handleOk} form={form}>
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
                            onChange={(e) =>
                                setFormLogin({
                                    ...formLogin,
                                    email: e.target.value,
                                })
                            }
                            value={formLogin.email}
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
                            onChange={(e) =>
                                setFormLogin({
                                    ...formLogin,
                                    password: e.target.value,
                                })
                            }
                            value={formLogin.password}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>Remember me</Checkbox>
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
