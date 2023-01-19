import { Button, Checkbox, Form, Input, Modal, notification } from "antd";
import classNames from "classnames/bind";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { StateContext } from "../../contexts/GlobalState";

import {
    faEnvelope,
    faKey,
    faLocationDot,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SignUpPage.module.scss";
import authSevices from "../../services/authServices";

const cx = classNames.bind(styles);

const SignUpPage = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const {
        isModalOpen,
        setIsModalOpen,
        setInputValue,
        inputValue,
        initalValue,
    } = useContext(StateContext);

    const handleOk = async () => {
        try {
            const { confirmPassword, isCheckRules, ...rest } = inputValue;
            const response = await authSevices.register(rest);

            api.open({
                duration: 1.5,
                icon: (
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "green" }}
                    />
                ),
                message: `${response?.data.message}`,
            });
            setInputValue(initalValue);
        } catch (error) {
            console.log(error);
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
                onCancel={handleCancel}
                centered
                footer={[]}
                className={cx("wrapper")}
            >
                <h2>Sign Up</h2>
                <Form onFinish={handleOk}>
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
                            className={cx("input")}
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    username: e.target.value,
                                })
                            }
                            value={inputValue.username}
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
                            className={cx("input")}
                            type="email"
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    email: e.target.value,
                                })
                            }
                            value={inputValue.email}
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
                            className={cx("input")}
                            type="number"
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    phone: e.target.value,
                                })
                            }
                            value={inputValue.phone}
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
                            className={cx("input")}
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    address: e.target.value,
                                })
                            }
                            value={inputValue.address}
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
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    password: e.target.value,
                                })
                            }
                            value={inputValue.password}
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
                            className={cx("input")}
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    confirmPassword: e.target.value,
                                })
                            }
                            value={inputValue.confirmPassword}
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
                        <Checkbox
                            className={cx("input")}
                            onChange={(e) =>
                                setInputValue({
                                    ...inputValue,
                                    isCheckRules: e.target.checked,
                                })
                            }
                            checked={inputValue.isCheckRules}
                        >
                            I agree with the policy and privacy
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={cx("btn")}
                            htmlType="submit"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default SignUpPage;
