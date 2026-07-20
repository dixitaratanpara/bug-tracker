import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/dashboard.css";
import { toast } from "react-toastify";
import BugCard from "../components/BugCard";
import DeleteModal from "../components/DeleteModal";
import DashboardHeader from "../components/DashboardHeader";
import SearchFilter from "../components/SearchFilter";
import StatesCards from "../components/StatsCards";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [sortOrder, setSortOrder] = useState("Newest");

    const [showModal, setShowModal] = useState(false);

    const [selectedBugId, setSelectedBugId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const bugsPerPage = 6;

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logout Successful!!!");

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

    //handle delete
    const handleDelete = async () => {

        try {
            await api.delete(`/bugs/${selectedBugId}`);

            toast.success("Bug Deleted Successfully");

            fetchBugs();

            setShowModal(false);

            setSelectedBugId(null);
        }
        catch (error) {
            console.log(error.response?.data);

            toast.error(error.response?.data?.message || "Something wnt wrong");
        }
    }

    const filteredBugs = bugs.filter((bug) => {
        const matchesSearch =
            bug.title.toLowerCase().includes(search.toLowerCase()) ||
            bug.description.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            bug.status === statusFilter;

        const matchesPriority =
            priorityFilter === "All" ||
            bug.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const sortedBugs = [...filteredBugs].sort((a, b) => {
        if (sortOrder === "Newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });



    const lastBugIndex = currentPage * bugsPerPage;
    const firstBugIndex = lastBugIndex - bugsPerPage;
    const currentBugs = filteredBugs.slice(firstBugIndex, lastBugIndex);


    return (

        <div className="dashboard">

            <DashboardHeader
                user={user}
                navigate={navigate}
                handleLogout={handleLogout}
            />

            <StatesCards bugs={bugs} />

            <SearchFilter
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            {bugs.length === 0 ? (
                <div className="empty-state">
                    <h1>🐞</h1>
                    <h2>No Bugs Found</h2>
                    <p>Create your first bug or change your search/filter.</p>
                    <button
                        className="btn create-btn"
                        onClick={() => navigate("/create-bug")}
                    >
                        + Create Bug
                    </button>
                </div>

            ) : filteredBugs.length === 0 ? (
                <h3 style={{
                    textAlign: "center",
                    marginTop: "30px",
                }}>No matching bugs found 🔍</h3>
            ) : (

                <div className="bug-list">

                    {currentBugs.map((bug) => (
                        <BugCard
                            key={bug._id}
                            bug={bug}
                            user={user}
                            navigate={navigate}
                            setSelectedBugId={setSelectedBugId}
                            setShowModal={setShowModal}
                        />
                    ))}
                </div>
            )}
            {
                <DeleteModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleDelete={handleDelete}

                />
            }

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={filteredBugs.length}
                itemsPerPage={bugsPerPage}

            />
            <Footer />
        </div>

    );
}

export default Dashboard;