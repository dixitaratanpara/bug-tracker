import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


//registerUser 
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check required fields(validation)
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

        //Remove password from response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updateAt: user.updatedAt,
        };

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

//login User
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        //find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        //compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        const token = jwt.sign({
            id:user._id,
        },
        process.env.JWT_SECRET,{
            expiresIn:"7d",
        }
    );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

};