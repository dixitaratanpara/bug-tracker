import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/auth.css";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "../utils/validation";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //email validation
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }


        //password validation
        if (!passwordRegex.test(formData.password)) {
            toast.error(
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
            );
            return;
        }

        try {
            const responce = await api.post("/auth/register", formData);

            console.log(responce.data);

            alert("Registration Successful!");

            navigate("/login");

            setFormData({
                name: "",
                email: "",
                password: "",
            });

        }
        catch (error) {
            console.log(error.response.data);

            toast.error(error.response.data.message);
        }
    };


    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Bug Tracker</h1>

                <h2>Created Account</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p className="bottom-text">
                    Already have an account? Login
                </p>
            </div>

        </div>
    );
}

export default Register;