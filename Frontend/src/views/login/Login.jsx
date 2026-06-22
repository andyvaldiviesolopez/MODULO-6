import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURI}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Errore durante il login");
    }

  };

  return (<div className="container mt-5"> <h2>Login</h2>

    ```
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value
            })
          }
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Login
      </button>
      <div className="mt-3">
        <a
          href={`${process.env.REACT_APP_SERVERURI}/auth/google`}
          className="btn btn-danger"
        >
          Login con Google
        </a>
      </div>
      <div className="mt-3">
        <p>
          Non hai un account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn btn-primary"
          >
            Registrati
          </button>
        </p>
      </div>
    </form>
  </div>

  );
};

export default Login;
