import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate=useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Logout Successful!!!");

        navigate("/login");
    };

    return (
        <div
            style={{
                padding: "40px",
                fontFamily: "Arial",
            }}
        >
            <h1>Bag Tracker Dashboard</h1>

            {user ? (
                <>
                    <h2>Welcome,{user.name}</h2>

                    <p>Email:{user.email}</p>

                    <p>Role:{user.role}</p>

                    <button onClick={handleLogout}
                    style={{
                        marginTop:"20px",
                        padding:"10px 20px",
                        cursor:"pointer",
                    }}>LOGOUT</button>

                </>
            ) : (

                <h2>NO USER FOUND</h2>)}
        </div>
    );
}

export default Dashboard;