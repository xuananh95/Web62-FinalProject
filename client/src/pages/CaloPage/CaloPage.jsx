import {
  Card,
  Layout,
  Space,
  Col,
  Row,
  Avatar,
  Input,
  Button,
  Badge,
  Modal,
  Table,
  Popconfirm,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import autoAnimate from "@formkit/auto-animate";
import styles from "./CaloPage.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import FoodItem from "../../components/FoodItem/FoodItem";
import TableFood from "../../components/TableFood/TableFood";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const Text = Typography;

const onChange = (value) => {
  console.log("changed", value);
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const { Meta } = Card;

export const CaloPage = () => {
  //props

  //state&hooks
  const [totalprotein, setTotalprotein] = useState(0);
  const [totalcarb, setTotalcarb] = useState(0);
  const [totalfat, setTotalfat] = useState(0);
  const [inputFoodSearch, setInputFoodSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const foodListRef = useRef(null);
  const [foodbasket, setFoodbasket] = useState([]);

  const [data, setData] = useState({
    labels: ["Protein", "Tinh bột", "Chất Béo"],
    datasets: [
      {
        label: "Tỉ lệ các chất chính",
        data: [60, 30, 10],
        backgroundColor: [
          "rgb(255, 99, 132)",

          "rgb(255, 205, 86)",

          "rgb(54, 162, 235)",
        ],
      },
    ],
  });
  useEffect(() => {
    foodListRef.current && autoAnimate(foodListRef.current);
  }, [foodListRef]);
  //menu-st
  const [menu, setMenu] = useState([
    {
      path: "img/ucgasong.jpg",
      text: "Ức Gà ( Tươi )",
      protein: "31",
      carb: "0",
      fat: "4",
      calo: "165",
      id: uuidv4(),
    },
    {
      path: "img/longtrangtrung.PNG",
      text: "Lòng Trắng Trứng",
      protein: "11",
      carb: "0",
      fat: "0",
      calo: "52",
      id: uuidv4(),
    },
    {
      path: "img/longdotrung.PNG",
      text: "Lòng Đỏ Trứng",
      protein: "14",
      carb: "1",
      fat: "30",
      calo: "327",
      id: uuidv4(),
    },
    {
      path: "img/duigasong.jpg",
      text: "Đùi Gà ( Tươi )",
      protein: "19",
      carb: "0",
      fat: "9",
      calo: "161",
      id: uuidv4(),
    },
    {
      path: "img/cacao.jpg",
      text: "Bột Cacao",
      protein: "20",
      carb: "20",
      fat: "10",
      calo: "240",
      id: uuidv4(),
    },
    {
      path: "img/cua.jpg",
      text: "Thịt Cua",
      protein: "19",
      carb: "0",
      fat: "2",
      calo: "97",
      id: uuidv4(),
    },
    {
      path: "img/duachuot1.PNG",
      text: "Dưa Chuột",
      protein: "1",
      carb: "4",
      fat: "0",
      calo: "15",
      id: uuidv4(),
    },
    {
      path: "img/cucai.PNG",
      text: "Củ cải",
      protein: "1",
      carb: "4",
      fat: "0",
      calo: "18",
      id: uuidv4(),
    },
    {
      path: "img/cam.PNG",
      text: "Cam",
      protein: "0.9",
      carb: "8.4",
      fat: "0",
      calo: "37",
      id: uuidv4(),
    },
    {
      path: "img/chanh.PNG",
      text: "Chanh",
      protein: "0.9",
      carb: "4.8",
      fat: "0",
      calo: "23",
      id: uuidv4(),
    },
    {
      path: "img/chuoitay.PNG",
      text: "Chuối",
      protein: "0.9",
      carb: "15",
      fat: "0.3",
      calo: "66",
      id: uuidv4(),
    },
    {
      path: "img/dudu.PNG",
      text: "Đu Đủ",
      protein: "1",
      carb: "7.7",
      fat: "0",
      calo: "35",
      id: uuidv4(),
    },
    {
      path: "img/duahau.PNG",
      text: "Dưa Hấu",
      protein: "1.2",
      carb: "2.3",
      fat: "0.2",
      calo: "16",
      id: uuidv4(),
    },
    {
      path: "img/thitbo.PNG",
      text: "Thịt Bò",
      protein: "21",
      carb: "0",
      fat: "3.8",
      calo: "118",
      id: uuidv4(),
    },
    {
      path: "img/thitbokho.PNG",
      text: "Thịt Bò Khô",
      protein: "51",
      carb: "5.2",
      fat: "1.6",
      calo: "239",
      id: uuidv4(),
    },
    {
      path: "img/thitlonbachi.PNG",
      text: "Thịt Heo Ba Chỉ",
      protein: "16.5",
      carb: "0",
      fat: "21.5",
      calo: "260",
      id: uuidv4(),
    },
    {
      path: "img/thitlonnac.PNG",
      text: "Thịt Heo Nạc",
      protein: "19",
      carb: "0",
      fat: "7",
      calo: "139",
      id: uuidv4(),
    },
    {
      path: "img/cachep.PNG",
      text: "Cá Chép",
      protein: "16",
      carb: "0",
      fat: "3.6",
      calo: "96",
      id: uuidv4(),
    },
    {
      path: "img/cahoi.PNG",
      text: "Cá Hồi",
      protein: "22",
      carb: "0",
      fat: "5.3",
      calo: "136",
      id: uuidv4(),
    },
    {
      path: "img/cangu.PNG",
      text: "Cá Ngừ",
      protein: "21",
      carb: "0",
      fat: "0.3",
      calo: "87",
      id: uuidv4(),
    },
    {
      path: "img/carophi.PNG",
      text: "Cá Rô Phi",
      protein: "19.7",
      carb: "0",
      fat: "2.3",
      calo: "100",
      id: uuidv4(),
    },
    {
      path: "img/luon.PNG",
      text: "Thịt Lươn",
      protein: "20",
      carb: "0",
      fat: "1.5",
      calo: "99",
      id: uuidv4(),
    },
    {
      path: "img/ocbuou.PNG",
      text: "Ốc Bươu",
      protein: "11",
      carb: "8.3",
      fat: "0.7",
      calo: "84",
      id: uuidv4(),
    },
    {
      path: "img/so.PNG",
      text: "Sò",
      protein: "8.8",
      carb: "3",
      fat: "0.4",
      calo: "51",
      id: uuidv4(),
    },
    {
      path: "img/tom.PNG",
      text: "Tôm Biển",
      protein: "17.6",
      carb: "0.9",
      fat: "0.9",
      calo: "82",
      id: uuidv4(),
    },
    {
      path: "img/matong.PNG",
      text: "Mật Ong",
      protein: "0.4",
      carb: "81.3",
      fat: "0",
      calo: "327",
      id: uuidv4(),
    },
    {
      path: "img/cocacola.PNG",
      text: "Cocacola",
      protein: "0",
      carb: "10.4",
      fat: "0",
      calo: "42",
      id: uuidv4(),
    },
    {
      path: "img/bia.PNG",
      text: "Bia",
      protein: "1.6",
      carb: "9",
      fat: "0",
      calo: "43",
      id: uuidv4(),
    },
    {
      path: "img/raumuong.PNG",
      text: "Rau Muống",
      protein: "3.2",
      carb: "2.5",
      fat: "0",
      calo: "23",
      id: uuidv4(),
    },
    {
      path: "img/khoailang.PNG",
      text: "Khoai Lang",
      protein: "0.8",
      carb: "28.5",
      fat: "0.5",
      calo: "119",
      id: uuidv4(),
    },
    {
      path: "img/com.jpg",
      text: "Cơm Trắng",
      protein: "2.7",
      carb: "28.2",
      fat: "0.3",
      calo: "130",
      id: uuidv4(),
    },
    {
      path: "img/rauchanvit.jpg",
      text: "Rau Chân Vịt",
      protein: "2.9",
      carb: "3.6",
      fat: "3.3",
      calo: "23",
      id: uuidv4(),
    },
  ]);
  //menu-end

  //function
  const handleDelete = (key) => {
    const newData = foodbasket.filter((item) => item.id !== key);
    // console.log(key, newData);
    setFoodbasket(newData);
    //logicchart-start
    const deleteProduct = foodbasket.filter((item) => item.id === key);
    const p =
      totalprotein -
      (Number(deleteProduct[0].protein) * Number(deleteProduct[0].quantity)) /
        100;
    const c =
      totalcarb -
      (Number(deleteProduct[0].carb) * Number(deleteProduct[0].quantity)) / 100;
    const f =
      totalfat -
      (Number(deleteProduct[0].fat) * Number(deleteProduct[0].quantity)) / 100;

    setTotalprotein(p);
    setTotalcarb(c);
    setTotalfat(f);
    if (foodbasket.length == 1) {
      setData({
        labels: ["Protein", "Tinh bột", "Chất Béo"],
        datasets: [
          {
            label: "Tỉ lệ các chất chính",
            data: [0, 0, 0],
            backgroundColor: [
              "rgb(255, 99, 132)",
              // "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              // "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
            ],
          },
        ],
      });
    } else {
      setData({
        labels: ["Protein", "Tinh bột", "Chất Béo"],
        datasets: [
          {
            label: "Tỉ lệ các chất chính",
            data: [
              (p / (p + c + f)) * 100,
              (c / (p + c + f)) * 100,
              (f / (p + c + f)) * 100,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 205, 86)",
              "rgb(54, 162, 235)",
            ],
          },
        ],
      });
    }

    //logicchart-end
  };

  const onChangeSearchFood = (e) => {
    setInputFoodSearch(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSave = () => {
    console.log("save");
  };
  //
  const columns = [
    {
      title: "Tên",
      dataIndex: "text",
      key: "text",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Khối Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <p>{quantity}g</p>,
    },
    {
      title: "Calo",
      dataIndex: "calo",
      key: "calo",
      // render: (calo) => <p>{calo}</p>,
      render: (calo, quantity) => <p>{(+calo * +quantity.quantity) / 100}</p>,
    },
    {
      title: "Protein",
      dataIndex: "protein",
      key: "protein",
      render: (protein, quantity) => (
        <p>{(+protein * +quantity.quantity) / 100}</p>
      ),
    },
    {
      title: "Tinh Bột",
      dataIndex: "carb",
      key: "carb",
      // render: (Carb) => <p>{Carb}</p>,
      render: (carb, quantity) => <p>{(+carb * +quantity.quantity) / 100}</p>,
    },
    {
      title: "Chất Béo",
      dataIndex: "fat",
      key: "fat",
      // render: (fat) => <p>{fat}</p>,
      render: (fat, quantity) => <p>{(+fat * +quantity.quantity) / 100}</p>,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      // render: () => <a>Xóa món</a>,
      render: (id) =>
        foodbasket.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(id)}
          >
            {/* <<a>Xóa Món</a>> */}
            <FontAwesomeIcon icon={faTrash} className={styles.onHover} />
          </Popconfirm>
        ) : null,
    },
  ];
  console.log(foodbasket);

  return (
    <div className={styles.CaloPageWrapper}>
      <Row style={{ height: "110vh" }}>
        <Col md={15} style={{ marginLeft: "20px" }}>
          <div>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              BẢNG THÀNH PHẦN DINH DƯỠNG TÍNH THEO GAM
            </h2>
            <div className={styles.foodListContainer}>
              <Input
                placeholder="Find food here"
                style={{
                  width: "300px",
                  marginTop: "20px",
                  marginLeft: "70%",
                  padding: "9px",
                }}
                onChange={onChangeSearchFood}
              />

              <div className={styles.foodList} ref={foodListRef}>
                {menu
                  ?.filter((item) => {
                    return (
                      item.text
                        .toLowerCase()
                        .indexOf(inputFoodSearch.trim().toLowerCase()) !== -1
                    );
                  })
                  .map((item) => (
                    <FoodItem
                      key={item.path + item.id}
                      path={item.path}
                      text={item.text}
                      protein={item.protein}
                      carb={item.carb}
                      fat={item.fat}
                      calo={item.calo}
                      id={item.id}
                      foodItem={item}
                      foodbasket={foodbasket}
                      setFoodbasket={setFoodbasket}
                      setData={setData}
                      setTotalprotein={setTotalprotein}
                      setTotalcarb={setTotalcarb}
                      setTotalfat={setTotalfat}
                      totalprotein={totalprotein}
                      totalcarb={totalcarb}
                      totalfat={totalfat}
                    />
                  ))}
              </div>
            </div>
          </div>
        </Col>

        {/* menu-end */}
        <Col md={8} sm={8} xs={8}>
          <Row>
            <Col md={4} offset={20} style={{ marginTop: "80px" }}>
              <Badge
                count={foodbasket.length}
                onClick={showModal}
                showZero="true"
                className={styles.onHover}
                // text="Giỏ"
                // placement="start"
                // title="Giỏ đồ"
              >
                <Avatar shape="square" size="large" />
              </Badge>
              <Modal
                title="Các món đã chọn"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="save" onClick={handleSave}>
                    Lưu thực đơn
                  </Button>,
                  <Button key="Ok" type="primary" onClick={handleOk}>
                    Oke
                  </Button>,
                ]}
              >
                {/* <Table columns={columns} dataSource={foodbasket} /> */}
                <TableFood columns={columns} foodbasket={foodbasket} />
              </Modal>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginLeft: "10%" }}>
            <PolarArea data={data} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};
