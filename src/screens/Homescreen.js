import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Homescreen = () => {
  const [products, setProducts] = useState([]); //useState returns an array
  console.log(products);
  // console.log(setProducts);
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/products/");
    console.log(response);
    //update the products state
    setProducts(response.data);
  };

  //we make api calls in useeffect
  useEffect(
    //callback function
    () => {
      fetchProducts();
    },
    //dependency array
    //useEffect hook depends on this array
    //if the array is empty it will run once
    []
  );
  return (
    <div>
      <h1> Hottest Products</h1>
      <Row>
        {products.map((product, index) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {" "}
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Homescreen;
