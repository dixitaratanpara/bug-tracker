import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AdminUsers() {

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

            fetchUsers();

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
        <div>

            <h2>Manage Users</h2>

            {users.map((user) => (

                <div key={user._id}>

                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
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

            ))}

        </div>
    );
}

export default AdminUsers;