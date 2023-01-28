import {
    AppstoreOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    faCaretDown,
    faCartShopping,
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
                    <Link to="/dasboard/kho-hang">Quản lí kho</Link>
                ) : (
                    <Link>Thông tin cá nhân</Link>
                ),
            icon: <FontAwesomeIcon icon={faUser} />,
        },

        {
            label: <p onClick={onLogout}>Đăng xuất</p>,
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        },
    ];

    const url = window.location.href;
    const path = url.slice(21);

    const menu = [
        {
            label: "Trang chủ",
            path: "/",
            icon: <HomeOutlined />,
            event: () => setSelectedKeys(!selectedKeys),
        },
        {
            label: "Calo",
            path: "/calo",
            icon: <AppstoreOutlined />,
            event: () => setSelectedKeys(!selectedKeys),
        },
        {
            label: "Sản phẩm",
            path: "/product",
            icon: <ShoppingCartOutlined />,
            event: () => setSelectedKeys(!selectedKeys),
        },
    ];

    const result = menu.findIndex((item) => item.path === path) + 1;

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header--left")}>
                <h1>Fitness Health</h1>
            </div>
            <Menu
                className={cx("header--center")}
                defaultSelectedKeys={["1"]}
                theme="dark"
                selectedKeys={[result.toString()]}
                items={menu.map((item, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: (
                            <Link
                                className={cx("link")}
                                to={item.path}
                                state={{ from: item.label }}
                                onClick={item?.event}
                            >
                                {item.icon} {item.label}
                            </Link>
                        ),
                    };
                })}
            />
            <div className={cx("account")}>
                {usersLocal !== undefined ? (
                    <>
                        <Space size={20}>
                            <Badge
                                showZero
                                count={2}
                                size="default"
                                offset={[1, 5]}
                            >
                                <Tooltip title="Giỏ hàng">
                                    <Link to="/cart/:id">
                                        <Avatar
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCartShopping}
                                                />
                                            }
                                        />
                                    </Link>
                                </Tooltip>
                            </Badge>
                            <di>
                                <Avatar
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: "#bfbfbf" }}
                                />
                                {usersLocal?.username}
                            </di>
                            <Dropdown menu={{ items }} arrow>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </Dropdown>
                        </Space>
                    </>
                ) : (
                    <>
                        <Button
                            type="primary"
                            onClick={() => setIsModalSignIn(true)}
                        >
                            Sign In
                        </Button>
                        <Button onClick={() => setIsModalSignUp(true)}>
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
