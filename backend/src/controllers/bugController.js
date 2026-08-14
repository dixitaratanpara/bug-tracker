import Bug from "../models/Bug.js";
import User from "../models/User.js";


//create Bug
export const createBug = async (req, res) => {
    try {
        const { title, description, projectName,priority } = req.body;

        if (!title || !description || !projectName) {
            return res.status(400).json({
                success: false,
                message: "Title and Description and Project Name are requried",
            });
        }

        const bug = await Bug.create({
            title,
            description,
            projectName,
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

        let filter={};
        if(req.user.role=== "Developer" || req.user.role==="Tester"){
            filter.assignedTo= req.user.id;
        }


        const bugs = await Bug.find(filter)
            .populate("createdBy", "name email role")
            .populate("assignedTo", "name email role")
            .sort({ createdAt: -1 });

        

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
        const bug = await Bug.findById(req.params.id);

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
        const { title, description,projectName, priority, status } = req.body;

        const bug = await Bug.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                projectName,
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
        const bug = await Bug.findByIdAndDelete(req.params.id);

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

//assign Bug
export const assignBug = async (req, res) => {
    try {
        const { userId } = req.body;

        const bug = await Bug.findById(req.params.id);

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: "Bug not found",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!["Developer", "Tester"].includes(user.role)) {
            return res.status(400).json({
                success: false,
                message: "Bug can only be assigned to Developer or Tester",
            });
        }

        bug.assignedTo = user._id;

        await bug.save();

        return res.status(200).json({
            success: true,
            message: "Bug Assigned Successfully",
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