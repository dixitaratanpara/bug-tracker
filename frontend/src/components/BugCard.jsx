function BugCard({ bug, user, navigate, setSelectedBugId, setShowModal }) {

    console.log("Bug=",bug);
    return (
        <div className="bug-card">

            <p>
                Created: {new Date(bug.createdAt).toLocaleDateString()}
                &nbsp;&nbsp;
                Updated: {new Date(bug.updatedAt).toLocaleDateString()}
            </p>

            <h3>Bug Title: {bug.title}</h3>

            <p>Bug Description: {bug.description}</p>

            <div className="badges">

                <span
                    className={`badge ${
                        bug.priority === "High"
                            ? "high"
                            : bug.priority === "Medium"
                            ? "medium"
                            : "low"
                    }`}
                >
                    Bug Priority: {bug.priority}
                </span>

                <span
                    className={`badge ${
                        bug.status === "Open"
                            ? "open"
                            : bug.status === "In Progress"
                            ? "progress"
                            : "resolved"
                    }`}
                >
                    Bug Status: {bug.status}
                </span>

            </div>

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

                <button
                    className="btn delete-btn"
                    onClick={() => {
                        setSelectedBugId(bug._id);
                        setShowModal(true);
                    }}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default BugCard;
