import Blog from "../models/Blog.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;

    try{
        blogs = await Blog.find();
    } catch(err){
        res.status(500).json({message: err.message});
    }

    if(!blogs){
        return res.status(404).json({message: "No blogs found!"});
    }

    return res.status(200).json({blogs: blogs});
}

export const createBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

    if(!existingUser)
        return res.status(404).json({message: "User not found!"});

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        console.log("blog created successfully!")
    } catch(err){
        res.status(500).json({message: err.message});
    }

    return res.status(201).json({blog});
}

export const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const {title, description} = req.body;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {title, description});   
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    if(!blog){
        return res.status(404).json({message: "No blog found!"});
    }
    console.log("blog updated successfully!");
    return res.status(200).json({blog: blog});
}

export const getBlogById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

    if(!blog){
        return res.status(404).json({message: "No blog found!"});
    }
    
    return res.status(200).json({blog: blog});
}

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

    if(!blog){
        return res.status(404).json({message: "No blog to delete!"});
    }

    return res.status(200).json({message: "Blog deleted successfully!"});
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let blogs;
    try{
        blogs = await User.findById(userId).populate("Blog");
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
    if(!blogs){
        return res.status(404).json({message: "No blogs found!"});
    }
    return res.status(200).json({blogs: blogs});
}