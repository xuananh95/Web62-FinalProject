import {
    faBagShopping,
    faBriefcase,
    faDumbbell,
    faFire,
    faFish,
    faGauge,
    faGears,
    faPersonRunning,
    faScaleUnbalanced,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import classNames from "classnames/bind";
import React from "react";
import { Link, Outlet } from "react-router-dom";

import styles from "./ProductPage.module.scss";

const cx = classNames.bind(styles);

const ProductPage = () => {
    const { Sider } = Layout;
    const items = [
        {
            label: "Whey protein",
            path: "whey-protein",
            icon: <FontAwesomeIcon icon={faTrophy} />,
        },
        {
            label: "Protein thực vật",
            path: "protein-thuc-vat",
            icon: <FontAwesomeIcon icon={faGauge} />,
        },
        {
            label: "Sữa tăng cân",
            path: "sua-tang-can",
            icon: <FontAwesomeIcon icon={faBagShopping} />,
        },
        {
            label: "BCAA Amino Acids",
            path: "BCAA-amino-acids",
            icon: <FontAwesomeIcon icon={faGears} />,
        },
        {
            label: "Tăng sức mạnh",
            path: "tang-suc-manh",
            icon: <FontAwesomeIcon icon={faFire} />,
        },
        {
            label: "Hỗ trợ giảm cân",
            path: "ho-tro-giam-can",
            icon: <FontAwesomeIcon icon={faDumbbell} />,
        },
        {
            label: "Vitamin khoáng chất",
            path: "vitamin-khoang-chat",
            icon: <FontAwesomeIcon icon={faScaleUnbalanced} />,
        },
        {
            label: "Dầu cá Omega-3",
            path: "dau-ca-omega3",
            icon: <FontAwesomeIcon icon={faFish} />,
        },
        {
            label: "Dinh dưỡng chạy bộ",
            path: "dinh-duong-chay-bo",
            icon: <FontAwesomeIcon icon={faPersonRunning} />,
        },
        {
            label: "Phụ kiện tập ",
            path: "phu-kien-tap",
            icon: <FontAwesomeIcon icon={faBriefcase} />,
        },
    ];

    return (
        <div className={cx("wrapper")}>
            <Sider width="18%">
                <Menu
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

            <Outlet />
        </div>
    );
};

export default ProductPage;
