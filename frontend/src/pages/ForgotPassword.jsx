import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../style/auth.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.post(
                "/auth/forgot-password",
                { email }
            );

            toast.success(response.data.message);

            setEmail("");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
    <div className="auth-container">

        <div className="auth-card">

            <h1>Bug Tracker</h1>

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

            </form>

            <p className="bottom-text">
                Remember your password?{" "}
                <Link to="/login">Login</Link>
            </p>

        </div>

    </div>
);
}
export default ForgotPassword;