import {
    AppstoreOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
    const menu = [
        {
            label: "Home",
            path: "/",
            icon: <HomeOutlined />,
        },
        {
            label: "Calo",
            path: "/calo",
            icon: <AppstoreOutlined />,
        },
        {
            label: "Product",
            path: "/product",
            icon: <ShoppingCartOutlined />,
        },
        {
            label: "Sign in",
            path: "/sign-in",
            icon: <UserOutlined />,
        },
        {
            label: "Sign up",
            path: "/sign-up",
            icon: <UserAddOutlined />,
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
                            <Link className={cx("link")} to={item.path}>
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
