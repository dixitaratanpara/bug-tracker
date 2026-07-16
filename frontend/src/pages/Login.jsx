import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/auth.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const responce = await api.post("/auth/login", formData);

      //save token
      localStorage.setItem("token", responce.data.token);

      //save user
      localStorage.setItem("user",
        JSON.stringify(responce.data.user)
      );

      toast.success("Login Successful");

      navigate("/dashboard");

      console.log(responce);

      // setFormData({
      //   email: "",
      //   password: "",
      // });

    }
    catch (error) {
      console.log(error.response?.data);

      toast.error(error.response.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
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

          <button type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p style={{ marginTop: "15px" }}>
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
          
        </form>

        <p className="bottom-text">
          Don't have an account? Register
        </p>

      </div>
    </div>
  );
}

export default Login;