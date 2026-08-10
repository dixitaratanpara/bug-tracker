function DashboardHeader({ user, navigate, handleLogout, }) {
    return (
        <>
            <div className="dashboard-header">

                <div className="dashboard-title">

                    <h1>🐞Bug Tracker Dashboard</h1>

                    <p>Welcome,{user?.name}</p>
                    <p>{user?.role}</p>
                    <p>{user?.email}</p><br></br>

                    <button
                        className="btn profile-btn"
                        onClick={() => navigate("/profile")}
                    >
                        My Profile
                    </button>

                </div>

                <div className="header-buttons">

                    {(user?.role === "Admin" || user?.role === "Developer") && (
                        <button
                            className="btn create-btn"
                            onClick={() => navigate("/create-bug")}
                        >
                            +Create Bug
                        </button>
                    )}

                    <button
                        className="btn logout-btn"
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </button>

                </div>

            </div>
            <div>
                {user?.role === "Admin" && (
                    <button
                        className="btn logout-btn"
                        onClick={() => navigate("/admin/users")}>
                        Manage User
                    </button>
                )}
            </div>
        </>
    );
}
export default DashboardHeader;