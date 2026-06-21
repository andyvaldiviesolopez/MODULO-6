import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = () => {
const [posts, setPosts] = useState([]);

useEffect(() => {
const getPosts = async () => {
try {
const response = await fetch(`${process.env.REACT_APP_SERVERURI}/posts`);
    const data = await response.json();

    setPosts(data.posts);

  } catch (error) {
    console.error(error);
  }
};

getPosts();

}, []);

return ( <Row>
{posts.map((post) => (
<Col
key={post._id}
md={4}
style={{
marginBottom: 50,
}}
>
<BlogItem {...post} /> </Col>
))} </Row>
);
};

export default BlogList;
