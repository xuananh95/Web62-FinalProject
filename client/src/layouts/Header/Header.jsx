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
import { notification } from "antd";

import { Avatar, Badge, Button, Dropdown, Menu, Space, Tooltip } from "antd";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { useSelector } from "react-redux";
import { StateContext } from "../../contexts/GlobalState";
import LocalStorage from "../../contexts/LocalStorage";
import authSevices from "../../services/authServices";

import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
    const navigate = useNavigate();
    const { setIsModalSignUp, setIsModalSignIn, currentPage, setIsLogined } =
        useContext(StateContext);
    const [api, contextHolder] = notification.useNotification();
    const carts = useSelector((state) => state.cart);
    const usersLocal = LocalStorage?.getItem("users")?.other;
    const totalCart = carts.reduce((prev, curr) => prev + curr.quantity, 0);
    const onLogout = async () => {
        const accessToken = await LocalStorage.getItem("users")?.accessToken;
        const res = await authSevices.logout(accessToken);
        api.success({
            duration: 1.5,
            message: `${res?.data?.message}`,
        });
        LocalStorage.deleteItem("users");
        setIsLogined(false);
        navigate("/");
    };

    const items = [
        {
            label:
                usersLocal?.role === "ADMIN" ? (
                    <Link to="/dashboard/kho-hang" className={cx("link")}>
                        Quản lí kho
                    </Link>
                ) : (
                    <Link to="/profile" className={cx("link")}>
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
            label: "Dinh dưỡng",
            keyPath: "/calo",
            icon: <AppstoreOutlined style={{ fontSize: "1.5rem" }} />,
        },
        {
            label: "Sản phẩm",
            keyPath: `/product?page=${currentPage}`,
            icon: <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />,
        },
    ];

    return (
        <div className={cx("wrapper")}>
            {contextHolder}
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
                            {usersLocal?.role === "ADMIN" ? (
                                <></>
                            ) : (
                                <Badge
                                    showZero
                                    count={totalCart}
                                    size="default"
                                    offset={[1, 5]}
                                >
                                    <Tooltip title="Giỏ hàng">
                                        <Link to={`/cart/${usersLocal._id}`}>
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
                            )}
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
                            Đăng nhập
                        </Button>
                        <Button
                            size="large"
                            onClick={() => setIsModalSignUp(true)}
                        >
                            Đăng kí
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
