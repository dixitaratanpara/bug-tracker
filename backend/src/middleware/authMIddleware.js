import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        //get token from request header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        //extract token 
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Store user id in request 
        req.user = decoded;

        console.log("User Role:", req.user.role);

        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;