import {
    AppstoreOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    faCaretDown,
    faCartShopping,
    faList,
    faRightFromBracket,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Button, Dropdown, Menu, Space, Tooltip } from "antd";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
    const { setIsModalSignUp, setIsModalSignIn, setIsLogined } =
        useContext(StateContext);
    const [selectedKeys, setSelectedKeys] = useState(false);
    const usersLocal = LocalStorage?.getItem("users")?.other;

    const onLogout = () => {
        LocalStorage.deleteItem("users");
    };

    const items = [
        {
            label:
                usersLocal?.role === "ADMIN" ? (
                    <Link to="/dasboard/kho-hang" className={cx("link")}>
                        Quản lí kho
                    </Link>
                ) : (
                    <Link to="/dashboard/profile" className={cx("link")}>
                        Thông tin cá nhân
                    </Link>
                ),
            icon: (
                <FontAwesomeIcon style={{ fontSize: "1rem" }} icon={faUser} />
            ),
        },

        {
            label: (
                <p onClick={onLogout} className={cx("link")}>
                    Đăng xuất
                </p>
            ),
            icon: (
                <FontAwesomeIcon
                    style={{ fontSize: "1rem" }}
                    icon={faRightFromBracket}
                />
            ),
        },
    ];

    const menu = [
        {
            label: "Trang chủ",
            keyPath: "/",
            icon: <HomeOutlined style={{ fontSize: "1.5rem" }} />,
        },
        {
            label: "Calo",
            keyPath: "/calo",
            icon: <AppstoreOutlined style={{ fontSize: "1.5rem" }} />,
        },
        {
            label: "Sản phẩm",
            keyPath: "/product",
            icon: <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />,
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header--left")}>
                <h1>Fitness Health</h1>
            </div>

            <Menu
                className={cx("header--center")}
                defaultSelectedKeys={["1"]}
                theme="dark"
                items={menu.map((item, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: (
                            <Link className={cx("link")} to={item.keyPath}>
                                {item.icon} {item.label}
                            </Link>
                        ),
                    };
                })}
            />
            <div className={cx("account")}>
                {usersLocal !== undefined ? (
                    <>
                        <Space size={40}>
                            <Badge
                                showZero
                                count={2}
                                size="default"
                                offset={[1, 5]}
                            >
                                <Tooltip title="Giỏ hàng">
                                    <Link to="/cart/:id">
                                        <Avatar
                                            size={"large"}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCartShopping}
                                                />
                                            }
                                        />
                                    </Link>
                                </Tooltip>
                            </Badge>
                            <Space size={10}>
                                <Avatar
                                    icon={<UserOutlined />}
                                    size={"large"}
                                    style={{ backgroundColor: "#bfbfbf" }}
                                />
                                {usersLocal?.username}
                            </Space>
                        </Space>
                        <Dropdown menu={{ items }} className={cx("menu")} arrow>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                }}
                            />
                        </Dropdown>
                    </>
                ) : (
                    <>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => setIsModalSignIn(true)}
                        >
                            Sign In
                        </Button>
                        <Button
                            size="large"
                            onClick={() => setIsModalSignUp(true)}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
