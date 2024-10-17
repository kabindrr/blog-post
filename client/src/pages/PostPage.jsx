import React, { useEffect, useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/footer";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  let location = useLocation();
  console.log(location);

  let queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("id");

  const [article, setArticle] = useState({});
  // Sample data for the article

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1/post/" + postId)
      .then((response) => {
        console.log(response.data.data);
        let postData = response.data.data;
        setArticle(postData);
      });
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5">
        {/* Article Image with height restriction */}
        <Row>
          <Col>
            <Image
              src={article.image}
              alt="Article"
              fluid
              className="mb-4 rounded"
              style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
            />
          </Col>
        </Row>

        {/* Title, Content, and Author Section */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="mb-3">{article.title}</h1>
            <hr />
            <p>{article.content}</p>
            <div className="author-info mt-4">
              <p>
                <strong>Written by:</strong> {article?.author?.username}
              </p>
              <p>
                <small>{article.date}</small>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default PostPage;
