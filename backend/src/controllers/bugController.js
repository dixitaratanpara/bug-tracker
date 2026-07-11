import Bug from "../models/Bug.js";


//create BuG
export const createBug = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and Description are requried",
            });
        }

        const bug = await Bug.create({
            title,
            description,
            priority,
            createdBy: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Bug Created Successfully",
        });
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

};

//GET Bug
export const getAllBugs = async (req, res) => {
    try {
        const bugs = await Bug.find({ createdBy: req.user.id }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: bugs.length,
            bugs,
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

//GET Single Bug
export const getSingleBug = async (req, res) => {
    try {
        const bug = await Bug.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: "Bug not found",
            });
        }

        return res.status(200).json({
            success: true,
            bug,
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

//Update Bug
export const updateBug = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;

        const bug = await Bug.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user.id,
            },
            {
                title,
                description,
                priority,
                status,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: "Bug not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bug Updated Successfully",
            bug,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//Delete Bug
export const deleteBug = async (req, res) => {
    try {
        const bug = await Bug.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });
        if (!bug) {
            return res.status(404).json({
                success: false,
                message: "Bug not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bug Deleted Successfully",
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