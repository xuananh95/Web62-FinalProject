import {
    AppstoreOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { StateContext } from "../../contexts/GlobalState";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
    const { setIsModalOpen } = useContext(StateContext);
    const [selectedKeys, setSelectedKeys] = useState(false);
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
        {
            label: "Đăng nhập",
            path: "/users/sign-in",
            icon: <UserOutlined />,
            event: () => setIsModalOpen(true),
        },
        {
            label: "Đăng kí",
            path: "/users/sign-up",
            icon: <UserAddOutlined />,
            event: () => setIsModalOpen(true),
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
        </div>
    );
};

export default Header;
