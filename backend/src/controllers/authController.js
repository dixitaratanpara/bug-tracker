import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { emailRegex, passwordRegex } from "../utils/validation.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";


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

        //email validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.",
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
            id: user._id,
        },
            process.env.JWT_SECRET, {
            expiresIn: "7d",
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

//get user
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//Forgot Password 
export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");

        console.log(resetToken);

        user.resetPasswordToken = resetToken;

        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        const message = `
    <h2>Password Reset Request</h2>

    <p>You requested to reset your password.</p>

    <p>Click the button below to reset your password:</p>

    <a
        href="${resetUrl}"
        style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:6px;
        "
    >
        Reset Password
    </a>

    <p>This link will expire in 10 minutes.</p>

    <p>If you did not request this, please ignore this email.</p>
`;

        await sendEmail(
            email,
            "Reset Your Bug Tracker Password",
            message
        );

        return res.status(200).json({
            message: "User found. Next step: Generate reset token.",
        });

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

//reset password
export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or Expired Token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password Reset Successfully",
        });

    } catch (error) {
    console.error(error);

    return res.status(500).json({
        message: error.message,
    });
}
};