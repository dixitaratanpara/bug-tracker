import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import api from "../services/api";

function EditBug() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [bug, setBug] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
        status: "",
    });

    const fetchBug = async () => {
        try {
            const response = await api.get(`/bugs/${id}`);

            setBug(response.data.bug);

            setFormData({
                title: response.data.bug.title,
                description: response.data.bug.description,
                priority: response.data.bug.priority,
                status: response.data.bug.status,
            });
        }
        catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        fetchBug();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

     const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                await api.put(`/bugs/${id}`, formData);

                alert("Bug Updated Successfully");

                navigate("/dashboard");
            } 
            catch (error) {
                console.log(error.response?.data);

                alert(error.response?.data?.message || "Something went wrong");
            }
        };
        if (!bug) {
            return <h2>Loading...</h2>;
        }



    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Edit Bug</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                        />
                    </div>

                    <div className="form-group">
                        <label>Priority</label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <button type="submit">
                        Update Bug
                    </button>

                </form>

            </div>
        </div>
    );
}
export default EditBug;