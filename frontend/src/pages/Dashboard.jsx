import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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

    const handleDelete = async(id)=>{

        const confrimDelete= window.confirm(
            "Are you sure you want to delete this bug?"
        );

        if(!confrimDelete) return;

        try{
            await api.delete(`/bugs/${id}`);

            alert("Bug Deleted Successfully");

            fetchBugs();
        }
        catch(error){
            console.log(error.response?.data);

            alert(error.response?.data?.message|| "Something wnt wrong");
        }
    }

    return (
        <>
            <div
                style={{
                    padding: "40px",
                    fontFamily: "Arial",
                }}
            >
                <h1>Bug Tracker Dashboard</h1>

                {user ? (
                    <>
                        <h2>Welcome,{user.name}</h2>

                        <p>Email:{user.email}</p>

                        <p>Role:{user.role}</p>

                        <button onClick={handleLogout}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                cursor: "pointer",
                            }}>LOGOUT</button>&nbsp; &nbsp;
                        <button onClick={() => navigate("/create-bug")}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                cursor: "pointer",
                            }}

                        >+Create Bug</button>
                    </>
                ) : (

                    <h2>NO USER FOUND</h2>)}

            </div>

            <div>
                <h2>My Bugs</h2>
                {bugs.length === 0 ? (
                    <p>No Bugs Found</p>
                ) : (
                    bugs.map((bug) => (
                        <div key={bug._id}>
                            <h3>{bug.title}</h3>
                            <p>{bug.description}</p>
                            <p>Priority:{bug.priority}</p>
                            <p>Status:{bug.status}</p>
                            <hr />
                            <div style={{ marginTop: "10px" }}>
                                <button
                                    onClick={() => navigate(`/edit-bug/${bug._id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={()=>handleDelete(bug._id)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Dashboard;