import { Button, Input, Select, Space } from "antd";
import classNames from "classnames/bind";
import React from "react";

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

const Search = () => {
    return (
        <div className={cx("sort")}>
            {" "}
            <Space size={10}>
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
                <Input.Search
                    size="large"
                    placeholder="Tìm kiếm sản phẩm ..."
                />
            </Space>
        </div>
    );
};

export default Search;
