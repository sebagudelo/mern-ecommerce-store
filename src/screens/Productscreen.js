import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";
import axios from "axios";

const Productscreen = () => {
  const [product, setProduct] = useState({});
  const params = useParams(); //useParams returns an object of url parameters
  console.log(params);
  const { id } = params;
  //  const product = products.find((p) => p._id === id);
  const fetchProduct = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/products/${id}`
    );
    console.log(response);
    if (response.data) {
      setProduct(response.data);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => {
      setProduct({});
    };
  }, []);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        {" "}
        Go Back{" "}
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              <h3> {product.name}</h3>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                color="#F8E825"
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>{" "}
        </Col>
      </Row>
    </>
  );
};

export default Productscreen;
