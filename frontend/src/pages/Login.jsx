import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    try {
      const responce = await api.post("/auth/login", formData);

      //save token
      localStorage.setItem("token", responce.data.token);

      //save user
      localStorage.setItem("user",
        JSON.stringify(responce.data.user)
      );

      alert("Login Successful!");

      navigate("/dashboard");

      console.log(responce);

      // setFormData({
      //   email: "",
      //   password: "",
      // });

    }
    catch (error) {
      console.log(error.response?.data);

      alert(error.response.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Bug Tracker</h1>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

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
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account? Register
        </p>

      </div>
    </div>
  );
}

export default Login;