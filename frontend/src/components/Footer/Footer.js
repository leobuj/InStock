import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        color: "ffffff",
        backgroundColor: "#494c52", // Set background color to #64799c
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3" style={{ color: "white" }}>
            Copyright &copy; InStock
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
