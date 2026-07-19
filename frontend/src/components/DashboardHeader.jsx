function DashboardHeader({
    user,
    navigate,
    handleLogout,
})
{
  return(
     
            <div className="dashboard-header">

                <div className="dashboard-title">
                    <h1>🐞Bug Tracker Dashboard</h1>
                    <p>Welcome,{user?.name}</p>
                    <p>{user?.role}</p>
                    <p>{user?.email}</p>
                </div>

                <div className="header-buttons">
{(user?.role === "Admin" || user?.role === "Developer") && (
                    <button className="btn create-btn"
                        onClick={() => navigate("/create-bug")}
                    >+Create Bug</button>
)}
                    <button className="btn logout-btn"
                        onClick={handleLogout}
                    >LOGOUT</button>

                </div>

            </div>
  );
}
export default DashboardHeader;