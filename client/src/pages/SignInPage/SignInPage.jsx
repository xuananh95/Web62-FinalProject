import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import classNames from "classnames/bind";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../contexts/GlobalState";

import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SignInPage.module.scss";

const cx = classNames.bind(styles);

const SignInPage = () => {
    const { isModalOpen, setIsModalOpen } = useContext(StateContext);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const handleOk = () => {
        // setIsModalOpen(false);
        // navigate("/");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/");
    };
    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={[]}
            className={cx("wrapper")}
        >
            <h2>Sign In</h2>
            <Form>
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
                        className={cx("input")}
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
                        className={cx("input")}
                    />
                </Form.Item>
                <Form.Item>
                    <Checkbox className={cx("input")}>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button
                        className={cx("btn")}
                        onClick={handleOk}
                        type="primary"
                        htmlType="submit"
                    >
                        Sign In
                    </Button>
                    ,
                </Form.Item>
                <Form.Item>
                    <Button type="link" style={{ width: "100%" }}>
                        Forgot pasword?
                    </Button>
                    ,
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SignInPage;
