import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function EditProfile() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            setName(user.name);
        }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.put(
                "/auth/profile",
                { name }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success(response.data.message);

            navigate("/profile");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Edit Profile</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditProfile;