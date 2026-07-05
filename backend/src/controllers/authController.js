import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        //hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User Register Successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            success: true,
            message: "Inteernal Server Error",
        });
    }

};