import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Button, Typography, Table, Row, Col, Card, Alert } from "antd";
import { workspacesAnalytics } from "../../components/actions/workspaceActions";
import LoadingBox from "../../components/loadingBox";
import DateIntegerPlot from "../../components/plot";

const { Content } = Layout;
const { Title } = Typography;

const Details = () => {
  const {
    state: { type },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log({ type });

  useEffect(() => {
    if (type?.length) {
      console.log("in", type);
      dispatch(workspacesAnalytics(type));
    }
  }, [dispatch, type]);

  const {
    loading,
    error,
    workspace_analytics,
    workspace_activity,
    weekly_signups,
  } = useSelector((state) => state.workspacesAnalytics);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRowClick = (id) => {
    navigate(`/workspace/${id}`);
  };

  const columns = [
    { title: "Workspace Id", dataIndex: "workspace_id", key: "workspace_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Creator Email",
      dataIndex: "creator_email",
      key: "creator_email",
    },
    {
      title: "Activity Count",
      dataIndex: "activity_count",
      key: "activity_count",
    },
  ];

  return (
    <Layout>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <Alert message="Error Occurred" type="error" />
      ) : (
        <Content style={{ padding: "50px" }}>
          <Button
            type="primary"
            onClick={handleBackClick}
            style={{ marginBottom: "20px" }}
          >
            Back
          </Button>

          {type === "workspacesactivity" && (
            <>
              <Title level={2} align="center" gutterBottom>
                Workspace Activity
              </Title>
              <Table
                columns={columns}
                dataSource={workspace_activity}
                onRow={(record) => {
                  return {
                    onClick: () => handleRowClick(record.id),
                  };
                }}
                pagination={{ pageSize: 5 }}
                style={{ cursor: "pointer" }}
              />
            </>
          )}

          {type === "weeklysignups" && (
            <>
              <Title level={2} align="center" gutterBottom>
                Weekly Signups
              </Title>
              <DateIntegerPlot data={weekly_signups || {}} />
            </>
          )}

          {type === "featureUsage" && (
            <>
              <Title level={2} align="center" gutterBottom>
                Feature Usage Statistics
              </Title>
              <Row justify="center" style={{ padding: "20px" }}>
                <Col span={24}>
                  <Card
                    title="Usage Statistics"
                    bordered={false}
                    style={{ width: "100%" }}
                  >
                    {workspace_analytics &&
                      Object.entries(workspace_analytics)?.map(
                        ([key, value]) => (
                          <Row key={key} style={{ marginBottom: "10px" }}>
                            <Col span={12} style={{ fontWeight: "bold" }}>
                              {key}
                            </Col>
                            <Col span={12}>{value}</Col>
                          </Row>
                        )
                      )}
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Content>
      )}
    </Layout>
  );
};

export default Details;
