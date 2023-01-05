import {
    EnvironmentOutlined,
    KeyOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import classNames from "classnames/bind";
import { useContext } from "react";
import { StateContext } from "../../contexts/GlobalState";
import { useNavigate } from "react-router-dom";

import styles from "./SignUpPage.module.scss";

const cx = classNames.bind(styles);

const SignUpPage = () => {
    const navigate = useNavigate();
    const {
        isModalOpen,
        setIsModalOpen,
        setInputValue,
        inputValue,
        initalValue,
    } = useContext(StateContext);

    const handleOk = () => {
        console.log(inputValue);
        setInputValue(initalValue);
        navigate("/sign-in");
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
            footer={[
                <Button onClick={handleOk} type="primary" className={cx("btn")}>
                    Sign Up
                </Button>,
            ]}
            className={cx("wrapper")}
        >
            <h2>Sign Up</h2>
            <Input
                prefix={<UserOutlined />}
                placeholder="User name"
                className={cx("input")}
                onChange={(e) =>
                    setInputValue({
                        ...inputValue,
                        userName: e.target.value,
                    })
                }
                value={inputValue.userName}
            />
            <Input
                prefix={<MailOutlined />}
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
            <Input
                prefix={<PhoneOutlined />}
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
            <Input
                prefix={<EnvironmentOutlined />}
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
            <Input.Password
                prefix={<KeyOutlined />}
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

            <Input.Password
                prefix={<KeyOutlined />}
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
        </Modal>
    );
};

export default SignUpPage;
