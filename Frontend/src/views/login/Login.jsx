import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      console.log("LOGIN DATA:", data);

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
    </form>
  </div>

  );
};

export default Login;
