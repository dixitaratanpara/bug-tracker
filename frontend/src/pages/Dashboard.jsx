import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/dashboard.css";


function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Logout Successful!!!");

        navigate("/login");
    };

    const [bugs, setBugs] = useState([]);

    const fetchBugs = async () => {
        try {
            const response = await api.get("/bugs");

            setBugs(response.data.bugs);
        }
        catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    const handleDelete = async (id) => {

        const confrimDelete = window.confirm(
            "Are you sure you want to delete this bug?"
        );

        if (!confrimDelete) return;

        try {
            await api.delete(`/bugs/${id}`);

            alert("Bug Deleted Successfully");

            fetchBugs();
        }
        catch (error) {
            console.log(error.response?.data);

            alert(error.response?.data?.message || "Something wnt wrong");
        }
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div className="dashboard-title">
                    <h1>🐞Bug Tracker Dashboard</h1>
                    <p>Welcome,{user?.name}</p>
                    <p>{user?.role}</p>
                    <p>{user?.email}</p>
                </div>

                <div className="header-buttons">

                    <button className="btn create-btn"
                        onClick={() => navigate("/create-bug")}
                    >+Create Bug</button>

                    <button className="btn logout-btn"
                        onClick={handleLogout}
                    >LOGOUT</button>

                </div>

            </div>


            <h2>My Bugs({bugs.length})</h2>

            {bugs.length === 0 ? (
                <p>No Bugs Found</p>
            ) : (
                <div className="bug-list">

                    {bugs.map((bug) => (
                        <div className="bug-card" key={bug._id}>

                            <h3>Bug Title:{bug.title}</h3>
                            <p>Bug Descritiopn :{bug.description}</p>

                            <div className="badges">
                                <span className={`badge ${
                                    bug.priority==="High"
                                    ? "high"
                                    :bug.priority==="Medium"
                                    ?"medium"
                                    :"low"
                                }`}>
                                    Bug Priority:{bug.priority}
                                </span>

                                <span className={`badge ${
                                    bug.status==="Open"
                                    ?"open"
                                    :bug.status === "In Progress"
                                    ?"progress"
                                    :"resolved"
                                }`}>
                                    Bug Status:{bug.status}
                                </span>

                            </div>

                            <div className="action">
                                <button
                                    className="btn edit-btn"
                                    onClick={() => navigate(`/edit-bug/${bug._id}`)}
                                >
                                    Edit
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button
                                    className="btn delete-btn"
                                    onClick={() => handleDelete(bug._id)}

                                >
                                    Delete
                                </button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default Dashboard;