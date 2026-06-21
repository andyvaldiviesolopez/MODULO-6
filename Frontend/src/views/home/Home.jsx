import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.REACT_APP_SERVERURI}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        setUser(data.author);

      } catch (error) {
        console.error(error);
      }
    };

    getMe();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">
        Benvenuto sullo Strive Blog!
      </h1>

      {user && (
        <h3>
          Ciao {user.firstName} 👋
        </h3>
      )}

      <BlogList />
    </Container>
  );
};

export default Home;