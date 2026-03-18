import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/userActions";
import { Container, Row, Col, Card, Alert, Form } from 'react-bootstrap';
import AppInput from "../../components/AppInput/AppInput";
import AppButton from "../../components/AppButton/AppButton";

const Login = () => {
  const [credentials, setCredentials] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      username: credentials.username,
      password: credentials.password,
    };
    dispatch(login(payload));
  };

  return (
    <Container className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="">
            <Card.Body className="p-4">
              <Card.Title className="text-center text-primary mb-4 fs-2">Login</Card.Title>
              
              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <AppInput
                  label="Username"
                  name="username"
                  value={credentials.username || ""}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
                <AppInput
                  label="Password"
                  type="password"
                  name="password"
                  value={credentials.password || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <AppButton
                  type="submit"
                  text={loading ? "Logging in..." : "Login"}
                  variant="primary"
                  className="w-100 mt-3"
                  disabled={loading}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
