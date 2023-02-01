import React from "react";
import styles from "./HomePage.module.css";
import { Col, Row } from "antd";
import { TDEEForm } from "../../components/TDEEForm/TDEEForm";

const HomePage = () => {
  return (
    <div>
      <img className={styles.imgMain} src="img/imgMain.png" alt="" />
      <div>
        <div className={styles.TDEEContainer}>
          <Row>
            <Col md={12} sm={24} xs={24} className={styles.colHalf}>
              <h2 className={styles.titleTDEE}>TDEE Là Gì?</h2>
              <p className={styles.descTDEE}>
                <b>TDEE (Total Daily Energy Expenditure)</b>nghĩa là lượng calo
                bạn sẽ đốt cháy trong 1 ngày, bao gồm cả ăn chơi ngủ nghỉ và tập
                luyện.
              </p>
              <p className={styles.descTDEE}>
                TDEE rất quan trọng trong việc giảm cân hay tăng cân hay tăng cơ
                vì nó giúp ta biết nên tiêu thụ bao nhiêu calo là đủ Công thức
                tính rất đơn giản và phù hợp với mọi đối tượng.
              </p>
              <h4 style={{ color: "rgba(185,178,172,1)" }}>
                Và đây là công cụ sẽ giúp bạn tính toán tự động
              </h4>
              <p className={styles.descTDEE}>
                Công việc của bạn chỉ là nhập số liệu vào và bấm{" "}
                <b>Tính TDEE</b> mà thôi!
              </p>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <TDEEForm />
              {/* <Row>
              </Row> */}
            </Col>
            {/*  */}
            <div class="marquee-w">
              <div class="marquee">
                <span className="textyyy">Your pleasure is our honor</span>
              </div>
              <div class="marquee marquee1">
                <span className="textyyy">Your pleasure is our honor</span>
              </div>
            </div>
            <div style={{ marginTop: "-4%", display: "flex" }}>
              <div style={{ width: "50%", paddingLeft: "40%" }}>
                <h3 className={styles.HomePageTitleContent}>FITNESS HEALTH</h3>
                {/* <h3 className={styles.HomePageDescContent}>
                  CUNG CẤP CÁCH TỐT HƠN{" "}
                </h3>
                <h3 className={styles.HomePageDescContent}>
                  ĐỂ CHĂM SÓC SỨC KHỎE CỦA BẠN
                </h3> */}
                <h3 className={styles.HomePageDescContent}>
                  CUNG CẤP CÁCH TỐT HƠN ĐỂ CHĂM SÓC SỨC KHỎE CỦA BẠN
                </h3>
              </div>
              <div style={{ width: "50%" }}>
                <img
                  src="img/pngcp.png"
                  alt=""
                  style={{ width: "38%", marginTop: "-8%", marginLeft: "77%" }}
                />
              </div>
            </div>

            {/*  */}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
