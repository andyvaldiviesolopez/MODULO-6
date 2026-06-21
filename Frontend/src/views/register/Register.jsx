import { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVERURI}/authors`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            console.log(data);

            alert("Registrazione completata!");
        } catch (error) {
            console.error(error);
            alert("Errore durante la registrazione");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registrazione</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Nome"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Cognome"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Registrati
                </button>
            </form>
        </div>
    );
};

export default Register;