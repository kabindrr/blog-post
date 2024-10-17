import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Navbar";
import PostCard from "../components/PostCard";
import Footer from "../components/footer";
import axios from "axios";

const HomePage = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9000/api/v1/post").then((response) => {
      console.log(response.data.data);
      let postData = response.data.data;
      setPost(postData);
    });
  }, []);

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ width: "66%", margin: "0 auto" }}
      >
        <Row className="mt-4">
          <Col className="text-center">
            <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center">
              {post.map((post1) => {
                console.log(post1);
                return <PostCard key={post1._id} post={post1} />;
              })}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
