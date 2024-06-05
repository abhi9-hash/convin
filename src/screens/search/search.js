import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWorkspaces } from "../../components/actions/workspaceActions";
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  Table,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../../components/loadingBox";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buttonClicked, setButtonClicked] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [search, setSearch] = useState("");

  const { loading, error, workspaces } = useSelector(
    (state) => state.workspaceList
  );

  const handleClick = () => {
    dispatch(listWorkspaces(criteria, search));
    setButtonClicked(true);
  };

  const handleDropdownChange = (value) => {
    setCriteria(value);
  };

  const handleBackClick = () => {
    navigate("/search");
    setButtonClicked(false);
  };

  const handleRowClick = (id) => {
    navigate(`/workspace/${id}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Creator Email",
      dataIndex: "creator email",
      key: "creator_email",
    },
    {
      title: "# Active Users",
      dataIndex: "# Active Users",
      key: "Active_Users",
    },
    {
      title: "# Total Users",
      dataIndex: "# Total Users",
      key: "Total_Users",
    },
  ];

  console.log({ workspaces });

  return (
    <Layout>
      <Content style={{ padding: "50px" }}>
        {buttonClicked ? (
          loading ? (
            <LoadingBox />
          ) : error ? (
            <h2>Error Occured</h2>
          ) : (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Button
                type="primary"
                onClick={handleBackClick}
                style={{ marginBottom: "20px" }}
              >
                Back
              </Button>
              <Title level={2} align="center">
                Workspaces
              </Title>
              <Table
                columns={columns}
                dataSource={workspaces}
                onRow={(record) => {
                  return {
                    onClick: () => handleRowClick(record.id),
                  };
                }}
                pagination={{ pageSize: 5 }}
                style={{ cursor: "pointer" }}
              />
            </Space>
          )
        ) : (
          <Row
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Row justify="space-between">
              <Button
                type="primary"
                onClick={handleBackClick}
                style={{ marginBottom: "20px" }}
              >
                Back
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/analytics", {
                    state: { type: "workspacesactivity" },
                  });
                }}
                style={{ marginBottom: "20px" }}
              >
                Workspace Activity
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/analytics", { state: { type: "featureUsage" } });
                }}
                style={{ marginBottom: "20px" }}
              >
                Usage Statistics
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/analytics", { state: { type: "weeklysignups" } });
                }}
                style={{ marginBottom: "20px" }}
              >
                Weekly Signups
              </Button>
            </Row>
            <Row
              span={24}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col span={12}>
                <Title level={3} style={{ textAlign: "center" }}>
                  Search for your workspace with either Workspace Name, ID or
                  Domain
                </Title>
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Select Option">
                        <Select
                          value={criteria}
                          onChange={handleDropdownChange}
                        >
                          <Option value="Name">Workspace Name</Option>
                          <Option value="ID">ID</Option>
                          <Option value="Domain">Domain</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Search">
                        <Input
                          placeholder="Enter your value"
                          value={search}
                          onChange={handleSearch}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Button
                      type="primary"
                      onClick={handleClick}
                      disabled={search === "" || criteria === ""}
                    >
                      Submit
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Row>
        )}
      </Content>
    </Layout>
  );
}
