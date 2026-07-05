import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";


const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//test route
app.get("/" ,(req,res)=>{
    res.send("Bug Tracker API is running.....");
});

app.use("/api/auth", authRoutes);

export default app;