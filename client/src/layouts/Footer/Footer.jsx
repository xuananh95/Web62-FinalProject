import {
    AppstoreOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    GooglePlusOutlined,
    HomeOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    SkypeOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("footer--left")}>
                <h1>Fitness Health</h1>
                <p>
                    <EnvironmentOutlined /> Address: Số 139 ngõ Thiên
                    Hiền,phường Mỹ Đình 1, quận Nam Từ Liêm, TP Hà Nội
                </p>
                <p>
                    <PhoneOutlined /> Contact: 0389326697
                </p>
                <p>
                    <MailOutlined /> Email: datdev2662@gmail.com
                </p>
            </div>

            <div className={cx("footer--center")}>
                <Link className={cx("link")} to="/">
                    <HomeOutlined style={{ fontSize: "1.5rem" }} /> Trang chủ
                </Link>
                <Link className={cx("link")} to="/calo">
                    <AppstoreOutlined style={{ fontSize: "1.5rem" }} /> Dinh
                    dưỡng
                </Link>
                <Link className={cx("link")} to="/product">
                    <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} /> Sản
                    phẩm
                </Link>
            </div>

            <div className={cx("footer--right")}>
                <p>Theo dõi</p>
                <Space size={20}>
                    <YoutubeOutlined className={cx("icon")} />
                    <GooglePlusOutlined className={cx("icon")} />
                    <InstagramOutlined className={cx("icon")} />
                    <SkypeOutlined className={cx("icon")} />
                    <FacebookOutlined className={cx("icon")} />
                </Space>
            </div>
        </div>
    );
};

export default Footer;
