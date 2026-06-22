import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import BlogItem from "../../components/blog/blog-item/BlogItem";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getMyPosts = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${process.env.REACT_APP_SERVERURI}/posts/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                setPosts(data.posts);

            } catch (error) {
                console.error(error);
            }
        };

        getMyPosts();
    }, []);

    const handleDelete = async (id) => {
        try {

            const token =
                localStorage.getItem("token");

            await fetch(
                `${process.env.REACT_APP_SERVERURI}/posts/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPosts(
                posts.filter(
                    post => post._id !== id
                )
            );

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container>
            <h1>I miei post</h1>

            <Row>
                {posts.map((post) => (
                    <Col md={4} key={post._id} className="mb-5">
                        <BlogItem {...post} />
                        <Button
                            variant="danger"
                            className="mt-2 w-100"
                            onClick={() => handleDelete(post._id)}
                        >
                            Elimina
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MyPosts;