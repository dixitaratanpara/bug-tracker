import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return 
    (

        <div className="auth-container">

            <div className="auth-card">

                <div className="profile-avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt="Profile" />
                    ) : (
                        <div className="avatar-placeholder">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="profile-info">

                    <p><strong>Name:</strong> {user.name}</p>

                    <p><strong>Email:</strong> {user.email}</p>

                    <p><strong>Role:</strong> {user.role}</p>

                    <p><strong>Total Bugs:</strong> {user.totalBugs}</p>

                    <p>
                        <strong>Joined:</strong>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                </div>

                <div className="profile-buttons">

                    <button onClick={() => navigate("/edit-profile")}>
                        Edit Profile
                    </button>

                    <button  onClick={() => navigate("/change-password")}>
                        Change Password
                    </button>

                </div>

            </div>
            
        </div>
    );
}

export default Profile;