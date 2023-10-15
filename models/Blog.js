import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        type: required
    },
    image:{
        type: String,
        required: true,
    },
    user:{
        type:String,
        required: true,
    }
})

export default mongoose.model('Blog', blogSchema)