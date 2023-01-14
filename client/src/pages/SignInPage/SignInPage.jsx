import { Button, Checkbox, Input, Modal } from "antd";
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
    const navigate = useNavigate();

    const handleOk = () => {
        setIsModalOpen(false);
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
            footer={[
                <Button className={cx("btn")} onClick={handleOk} type="primary">
                    Sign In
                </Button>,
                <Button type="link" style={{ width: "100%" }}>
                    Forgot pasword?
                </Button>,
            ]}
            className={cx("wrapper")}
        >
            <h2>Sign In</h2>
            <Input
                prefix={<FontAwesomeIcon icon={faEnvelope} />}
                placeholder="Email"
                type="email"
                className={cx("input")}
            />
            <Input.Password
                prefix={<FontAwesomeIcon icon={faKey} />}
                placeholder="Password"
                className={cx("input")}
            />
            <Checkbox className={cx("input")}>Remember me</Checkbox>
        </Modal>
    );
};

export default SignInPage;
