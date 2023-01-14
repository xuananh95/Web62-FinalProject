import { Button, Checkbox, Input, Modal } from "antd";
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
                prefix={<FontAwesomeIcon icon={faUser} />}
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
            <Input.Password
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

            <Input.Password
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
