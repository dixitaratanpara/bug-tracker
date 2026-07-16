import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1 style={{ fontSize: "80px" }}>404</h1>

            <h2>Page Not Found</h2>

            <p>
                The page you are looking for doesn't exist.
            </p>

            <button
                className="btn create-btn"
                onClick={() => navigate("/dashboard")}
            >
                Go To Dashboard
            </button>

        </div>
    );
}

export default NotFound;