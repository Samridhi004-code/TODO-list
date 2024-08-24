import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const host = process.env.REACT_APP_API_KEY;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${host}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/tasks";
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-50">
          <Col>
            <div className="border p-4 rounded">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    type="text"
                    placeholder="Enter Username"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div> */}
    </>
  );
};

export default Login;
