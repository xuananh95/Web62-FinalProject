import {
    faBagShopping,
    faBriefcase,
    faDumbbell,
    faScaleUnbalanced,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Card from "../../components/Card/Card";

import styles from "./ProductPage.module.scss";

const cx = classNames.bind(styles);

const ProductPage = () => {
    const { Sider } = Layout;
    const items = [
        {
            label: "Sữa tăng cân",
            path: "sua-tang-can",
            icon: (
                <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ fontSize: "1.2rem" }}
                />
            ),
        },

        {
            label: "Hỗ trợ giảm cân",
            path: "ho-tro-giam-can",
            icon: (
                <FontAwesomeIcon
                    icon={faDumbbell}
                    style={{ fontSize: "1.2rem" }}
                />
            ),
        },
        {
            label: "Vitamin khoáng chất",
            path: "vitamin-khoang-chat",
            icon: (
                <FontAwesomeIcon
                    icon={faScaleUnbalanced}
                    style={{ fontSize: "1.2rem" }}
                />
            ),
        },

        {
            label: "Phụ kiện tập ",
            path: "phu-kien-tap",
            icon: (
                <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ fontSize: "1.2rem" }}
                />
            ),
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <Sider width="18%">
                <Menu
                    style={{ fontSize: "1rem" }}
                    items={items.map((el) => {
                        return {
                            label: (
                                <Link to={el.path}>
                                    {el.icon} {el.label}
                                </Link>
                            ),
                        };
                    })}
                />
            </Sider>
            <Card />

            <Outlet />
        </div>
    );
};

export default ProductPage;
