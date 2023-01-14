import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Input, Pagination, Rate, Select } from "antd";
import classNames from "classnames/bind";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);
const WheyProtein = () => {
    const { Meta } = Card;

    return (
        <div className={cx("wrapper")}>
            <div className={cx("action")}>
                <div className={cx("sort")}>
                    {" "}
                    <h3>Sắp xếp theo: </h3>
                    <Button size="large">Phổ biến</Button>
                    <Button size="large">Mới nhất</Button>
                    <Button size="large">Bán chạy</Button>
                    <Select
                        size="large"
                        defaultValue="price"
                        options={[
                            {
                                value: "price",
                                label: "Giá : Thấp đến Cao",
                            },
                            {
                                value: "lucy",
                                label: "Giá : Cao đến Thấp",
                            },
                        ]}
                    />
                </div>
                <div className={cx("search")}>
                    {" "}
                    <Input.Search
                        size="large"
                        placeholder="Enter product ..."
                    />
                </div>
            </div>
            <div className={cx("card")}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        <img
                            alt="example"
                            src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2016/12/Whey-Rule-1-Protein-5lbs-1-280x280.jpg"
                        />
                    }
                >
                    <Meta title="Rule 1 Proteins 5Lbs" />{" "}
                    <Rate value={4} disabled />
                    <span> 250</span>
                    <p>2.000.000 d</p>
                    <div className={cx("buy")}>
                        <Button block danger>
                            <FontAwesomeIcon
                                icon={faCartPlus}
                                style={{ marginRight: "0.5rem" }}
                            />
                            Thêm giỏ hàng
                        </Button>
                        <Button
                            block
                            danger
                            type="primary"
                            style={{ marginTop: "0.5rem" }}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        <img
                            alt="example"
                            src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2016/12/Whey-Rule-1-Protein-5lbs-1-280x280.jpg"
                        />
                    }
                >
                    <Meta title="Rule 1 Proteins 5Lbs" />{" "}
                    <Rate value={4} disabled />
                    <span> 250</span>
                    <p>2.000.000 d</p>
                    <div className={cx("buy")}>
                        <Button block danger>
                            <FontAwesomeIcon
                                icon={faCartPlus}
                                style={{ marginRight: "0.5rem" }}
                            />
                            Thêm giỏ hàng
                        </Button>
                        <Button
                            block
                            danger
                            type="primary"
                            style={{ marginTop: "0.5rem" }}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        <img
                            alt="example"
                            src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2016/12/Whey-Rule-1-Protein-5lbs-1-280x280.jpg"
                        />
                    }
                >
                    <Meta title="Rule 1 Proteins 5Lbs" />{" "}
                    <Rate value={4} disabled />
                    <span> 250</span>
                    <p>2.000.000 d</p>
                    <div className={cx("buy")}>
                        <Button block danger>
                            <FontAwesomeIcon
                                icon={faCartPlus}
                                style={{ marginRight: "0.5rem" }}
                            />
                            Thêm giỏ hàng
                        </Button>
                        <Button
                            block
                            danger
                            type="primary"
                            style={{ marginTop: "0.5rem" }}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        <img
                            alt="example"
                            src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2016/12/Whey-Rule-1-Protein-5lbs-1-280x280.jpg"
                        />
                    }
                >
                    <Meta title="Rule 1 Proteins 5Lbs" />{" "}
                    <Rate value={4} disabled />
                    <span> 250</span>
                    <p>2.000.000 d</p>
                    <div className={cx("buy")}>
                        <Button block danger>
                            <FontAwesomeIcon
                                icon={faCartPlus}
                                style={{ marginRight: "0.5rem" }}
                            />
                            Thêm giỏ hàng
                        </Button>
                        <Button
                            block
                            danger
                            type="primary"
                            style={{ marginTop: "0.5rem" }}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                        <img
                            alt="example"
                            src="https://7ut8g5rmobj.cdn.hostvn.net/wp-content/uploads/2016/12/Whey-Rule-1-Protein-5lbs-1-280x280.jpg"
                        />
                    }
                >
                    <Meta title="Rule 1 Proteins 5Lbs" />{" "}
                    <Rate value={4} disabled />
                    <span> 250</span>
                    <p>2.000.000 d</p>
                    <div className={cx("buy")}>
                        <Button block danger>
                            <FontAwesomeIcon
                                icon={faCartPlus}
                                style={{ marginRight: "0.5rem" }}
                            />
                            Thêm giỏ hàng
                        </Button>
                        <Button
                            block
                            danger
                            type="primary"
                            style={{ marginTop: "0.5rem" }}
                        >
                            Mua ngay
                        </Button>
                    </div>
                </Card>
            </div>
            <div className={cx("pagination")}>
                <Pagination showQuickJumper defaultCurrent={2} total={500} />
            </div>
        </div>
    );
};

export default WheyProtein;
