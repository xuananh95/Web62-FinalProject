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
                    <HomeOutlined /> Home
                </Link>
                <Link className={cx("link")} to="/calo">
                    <AppstoreOutlined /> Calo
                </Link>
                <Link className={cx("link")} to="/product">
                    <ShoppingCartOutlined /> Product
                </Link>
            </div>

            <div className={cx("footer--right")}>
                <p>Follow us</p>
                <div>
                    <p>
                        <YoutubeOutlined />
                    </p>
                    <p>
                        <GooglePlusOutlined />
                    </p>
                    <p>
                        <InstagramOutlined />
                    </p>
                    <p>
                        <SkypeOutlined />
                    </p>
                    <p>
                        <FacebookOutlined />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
