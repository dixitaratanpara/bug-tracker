import User from "../models/User.js";

//getUser
export const getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        return res.status(200).json({
            users,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });

    }

};

//getrole
export const updateUserRole = async (req, res) => {

    try {

        const { id } = req.params;
        const { role } = req.body;

        const allowedRoles = ["Admin", "Developer", "Tester"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Invalid Role",
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.role = role;

        await user.save();

        return res.status(200).json({
            message: "User role updated successfully",
            user,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });

    }

};