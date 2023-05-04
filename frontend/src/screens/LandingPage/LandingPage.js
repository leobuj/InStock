import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/myitems");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">InStock</h1>
              <h2 className="subtitle">Your inventory management haven</h2>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingButton" color="#fffff">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" className="landingButton">
                  Sign-Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
