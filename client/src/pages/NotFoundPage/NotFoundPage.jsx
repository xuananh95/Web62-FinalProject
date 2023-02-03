import { Button } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";

const cx = classNames.bind(styles);

const NotFoundPage = () => {
    const navigate = useNavigate();
    const onBackHome = () => {
        navigate("/");
    };

    return (
        <>
            <img
                src="https://img.freepik.com/free-vector/error-404-page-found-confused-characters_107791-13163.jpg?w=1800&t=st=1675351989~exp=1675352589~hmac=46004274a6d909e3d254c866eaf075051e66f1ffb1780f6e802350afdd15bba8"
                alt="notfound"
                className={cx("image")}
            />
            <Button
                className={cx("btn")}
                type="primary"
                size="large"
                onClick={onBackHome}
            >
                Quay lại trang chủ
            </Button>
        </>
    );
};

export default NotFoundPage;
