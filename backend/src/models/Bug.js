import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
{

    title:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        required:true,
        trim:true,
    },

    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},
{
    timestamps:true,
}
);

const Bug = mongoose.model("Bug",bugSchema);

export default Bug;