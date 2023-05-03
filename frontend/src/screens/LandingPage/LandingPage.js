import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/myitems");
  //   }
  // }, [history]);

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
