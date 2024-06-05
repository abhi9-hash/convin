import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SignIn = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    navigate('/search')
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>
        <Card style={{ width: 300, padding: '20px' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                placeholder="Email"
                style={{ padding: '10px' }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                type="password"
                placeholder="Password"
                style={{ padding: '10px' }}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              {/* <a className="login-form-forgot" href="/" style={{ float: 'right' }}>
                Forgot password
              </a> */}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
              >
                Sign In
              </Button>
              {/* Or <a href="/">register now!</a> */}
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
