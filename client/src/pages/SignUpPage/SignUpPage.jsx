import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import classNames from "classnames/bind";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { StateContext } from "../../contexts/GlobalState";

import {
    faEnvelope,
    faKey,
    faLocationDot,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authSevices from "../../services/authServices";
import styles from "./SignUpPage.module.scss";

const cx = classNames.bind(styles);

const SignUpPage = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const { isModalSignUp, setIsModalSignUp, setInputValue, inputValue } =
        useContext(StateContext);

    const handleOk = async (values) => {
        try {
            const { confirmPassword, isCheckRules, ...rest } = values;

            const response = await authSevices.register(rest);
            api.success({
                duration: 1.5,
                message: `${response?.data?.message}`,
            });

            form.resetFields();
            setTimeout(() => {
                navigate("/users/sign-in", { replace: true });
            }, 1200);
        } catch (error) {
            api.warning({
                duration: 1.5,
                message: error,
            });
        }
    };

    const handleCancel = () => {
        setIsModalSignUp(false);
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={isModalSignUp}
                onCancel={handleCancel}
                centered
                footer={[]}
                className={cx("wrapper")}
            >
                <h2>Sign Up</h2>
                <Form
                    onFinish={handleOk}
                    form={form}
                    className={cx("form")}
                    size="large"
                >
                    <Form.Item
                        name={"username"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền username!",
                            },
                            {
                                pattern: "^[a-zA-Z0-9+]*$",
                                message: "Tên không có kí tự đặc biệt!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<FontAwesomeIcon icon={faUser} />}
                            placeholder="User name"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"email"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền email!",
                            },
                            {
                                type: "email",
                                message:
                                    "Email nhập không đúng định dạng! VD:user@gmail.com",
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
                        name={"phone"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền số điện thoại!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<FontAwesomeIcon icon={faPhone} />}
                            placeholder="Phone"
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"address"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền địa chỉ!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<FontAwesomeIcon icon={faLocationDot} />}
                            placeholder="Address"
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

                    <Form.Item
                        name={"confim-password"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập lại mật khẩu!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Mật khẩu nhập lại không đúng!"
                                        )
                                    );
                                },
                            }),
                        ]}
                        dependencies={["password"]}
                    >
                        <Input.Password
                            minLength={"8"}
                            prefix={<FontAwesomeIcon icon={faKey} />}
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name={"isCheck"}
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  "Vui lòng đọc kĩ điều khoản và đồng ý!"
                                              )
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>I agree with the policy and privacy</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SignUpPage;
