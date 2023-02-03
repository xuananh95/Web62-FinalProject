import { faPlus, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import classNames from "classnames/bind";
import { Link, Outlet } from "react-router-dom";

import styles from "./Dasboard.module.scss";

const cx = classNames.bind(styles);

const DasboardPage = () => {
    const { Sider } = Layout;
    const items = [
        {
            label: "Kho hàng",
            path: "kho-hang",
            icon: <FontAwesomeIcon icon={faWarehouse} />,
        },
        {
            label: "Thêm / sửa sản phẩm",
            path: "them-san-pham",
            icon: <FontAwesomeIcon icon={faPlus} />,
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <Sider width="20%">
                <Menu
                    style={{
                        fontSize: "1rem",
                        backgroundColor: "rgb(119, 118, 118)",
                        color: "#fff",
                    }}
                    items={items.map((el) => {
                        return {
                            label: (
                                <Link to={el.path}>
                                    {" "}
                                    {el.icon} {el.label}
                                </Link>
                            ),
                        };
                    })}
                />
            </Sider>
            <Outlet />
        </div>
    );
};

export default DasboardPage;
