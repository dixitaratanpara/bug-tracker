import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../style/auth.css";
import { passwordRegex } from "../utils/validation";


function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                `/auth/reset-password/${token}`,
                { password }
            );
            
                    if (!passwordRegex.test(password)) {
                        toast.error(
                            "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
                        );
                        return;
                    }

            toast.success(response.data.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Bug Tracker</h1>

                <h2>Reset Password</h2>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >


                    <div className="form-group">
                        <label>New Password</label>

                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Reset Password"}
                    </button>
                    
                    <p className="bottom-text">
                        Remember your password?{" "}
                        <a href="/login">Login</a>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default ResetPassword;