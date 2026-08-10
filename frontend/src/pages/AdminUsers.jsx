import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "../style/AdminUsers.css";
import { useNavigate } from "react-router-dom";

function AdminUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");

            setUsers(response.data.users);
        }
        catch (error) {
            console.log(error.response?.data);
        }

    };

    const handleRoleChange = async (id, role) => {
        try {
            await api.put(`/users/${id}/role`, { role });

            toast.success("Role Updated Successfully");

            // fetchUsers();

            navigate("/dashboard");

        }
        catch (error) {
            console.log(error.response?.data);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-users-page">

            <div className="admin-users-header">

                <h2>Manage Users</h2>
                 <p>Manage developer and tester roles</p>

            </div>

             <div className="users-list">

                 {users.map((user) => (
                      <div className="user-card"
                            key={user._id}>
                            
                             <div className="user-info">
                                <div className="user-avatar">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>

             </div>

             <div className="user-role">

            <label>Role</label>

                    <select
                        value={user.role}
                        onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                        }
                    >

                        <option value="Admin">Admin</option>

                        <option value="Developer">
                            Developer
                        </option>

                        <option value="Tester">
                            Tester
                        </option>

                    </select>


                </div>

                  </div>

            ))}

        </div>

          </div>
    );
}

export default AdminUsers;