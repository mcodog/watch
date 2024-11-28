import React from 'react';
import { Navbar, Nav, Container, Card, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';

const Homes = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar bg="dark" expand="lg" className="navbar fixed-top">
        <Container>
          <Navbar.Brand href="/" className="logo">WATCH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/home" className="text-white">Home</Nav.Link>
              <Nav.Link href="/login" className="text-white">Login</Nav.Link>
              <Nav.Link href="/register" className="text-white">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Carousel for featured images */}
      <Carousel className="carousel-section">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.thewatchcompany.com/media/tm_blog/p/o/7/1351/post_7_1351.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Exclusive Watch Collection</h3>
            <p>Discover our premium selection of watches.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.wsj.net/im-813476?width=620&height=413"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Timeless Designs</h3>
            <p>Style and elegance with every tick.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://nypost.com/wp-content/uploads/sites/2/2016/07/watch-out.jpg?quality=75&strip=all&w=744"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Modern Watches</h3>
            <p>Innovative designs for the modern lifestyle.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Featured Products Section */}
      <section className="featured-products">
        <Container>
          <Row className="g-4">
            {/* Watch Card 1 */}
            <Col md={4}>
              <Card className="watch-card">
                <Card.Img variant="top" src="https://s.alicdn.com/@sc04/kf/Hb9c28c3e20d74ffaa5017e8c0141091cP.jpg_300x300.jpg" />
                <Card.Body>
                  <Card.Title>Luxury Chronograph</Card.Title>
                  <Card.Text>
                    This chronograph brings luxury and precision to your wrist, perfect for all occasions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Watch Card 2 */}
            <Col md={4}>
              <Card className="watch-card">
                <Card.Img variant="top" src="https://img.joomcdn.net/dd8f63ba828131f406273f71ede9a459f39ebf4e_1024_1024.jpeg" />
                <Card.Body>
                  <Card.Title>Sports Edition</Card.Title>
                  <Card.Text>
                    Built for adventure, this sporty timepiece is perfect for active lifestyles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Watch Card 3 */}
            <Col md={4}>
              <Card className="watch-card">
                <Card.Img variant="top" src="https://img.kwcdn.com/product/open/2024-01-10/1704848833423-42011a255ebb4236accf2ca0c70a7b4c-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp" />
                <Card.Body>
                  <Card.Title>Classic Elegance</Card.Title>
                  <Card.Text>
                    A timeless design, combining sophistication and elegance for any event.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Homes;
