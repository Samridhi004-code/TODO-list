import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const Taskbar = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(window.location.pathname); // Initialize state with current path

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    setCurrentPage("login");
    // Redirect to the login page
    window.location.href = "/login";
  };

  const handleSignUp = () => {
    // Redirect to the resigter page
    setCurrentPage("register");
    window.location.href = "/register";
  };
  const handleLogin = () => {
    // Redirect to the login page
    setCurrentPage("login");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>TODO List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              currentPage !== "/register" ? (
                <Nav.Link onClick={handleSignUp}>Sign Up</Nav.Link>
              ) : (
                <Nav.Link onClick={handleLogin}>Login</Nav.Link>
              )
            ) : (
              <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            )}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Taskbar;
