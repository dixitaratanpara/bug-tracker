import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function BugCard({ bug, user, navigate, setSelectedBugId, setShowModal }) {

    console.log("Bug=", bug);

    const [assignableUsers, setAssignableUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        if (user?.role !== "Admin") {
            return;
        }

        const fetchAssignableUsers = async () => {
            try {
                const response = await api.get("/users/assignable");

                setAssignableUsers(response.data.users);
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchAssignableUsers();
    }, [user]);


    const handleAssign = async () => {
        if (!selectedUser) {
            toast.error("Please select a user");
            return;
        }

        try {
            await api.put(`/bugs/${bug._id}/assign`, {
                userId: selectedUser,
            });

            toast.success("Bug Assigned Successfully");

        } catch (error) {
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="bug-card">

            <p>
                Created: {new Date(bug.createdAt).toLocaleDateString()}
                &nbsp;
                Updated: {new Date(bug.updatedAt).toLocaleDateString()}
            </p>

            <br></br>

            <h3>Bug Title: {bug.title}</h3>
            &nbsp;
            <p>
                <strong>Bug Description:</strong> {bug.description}
            </p>
            &nbsp;
            {bug.assignedTo && (
                <p>
                    Assigned To: {bug.assignedTo.name} - {bug.assignedTo.role}
                </p>
            )}
            &nbsp;
            <p>
                <strong>Project:</strong> {bug.projectName || "N/A"}
            </p>

            <div className="badges">

                <span
                    className={`badge ${bug.priority === "High"
                        ? "high"
                        : bug.priority === "Medium"
                            ? "medium"
                            : "low"
                        }`}
                >
                    Bug Priority: {bug.priority}
                </span>

                <span
                    className={`badge ${bug.status === "Open"
                        ? "open"
                        : bug.status === "In Progress"
                            ? "progress"
                            : "resolved"
                        }`}
                >
                    Bug Status: {bug.status}
                </span>

            </div>

            {user?.role === "Admin" && (
                <div className="assign-section">

                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Assign User</option>

                        {assignableUsers.map((assignUser) => (
                            <option
                                key={assignUser._id}
                                value={assignUser._id}
                            >
                                {assignUser.name} - {assignUser.role}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        className="btn assign-btn"
                        onClick={handleAssign}
                    >
                        Assign Bug
                    </button>

                </div>
            )}

            <div className="action">
                {user?.role !== "Tester" && (
                    <button
                        className="btn edit-btn"
                        onClick={() => navigate(`/edit-bug/${bug._id}`)}
                    >
                        Edit
                    </button>
                )}

                &nbsp;&nbsp;&nbsp;&nbsp;

                {user?.role === "Admin" && (
                    <button className="btn delete-btn"
                        onClick={() => {
                            setSelectedBugId(bug._id);
                            setShowModal(true);
                        }}
                    >
                        Delete
                    </button>
                )}

            </div>

        </div>
    );
}

export default BugCard;
