import Blog from "../models/Blog.js";

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

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try{
        await blog.save();
        console.log("blog created successfully!")
    } catch(err){
        res.status(500).json({message: err.message});
    }

    return res.status(201).json({blog: blog});
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
        blog = await Blog.findByIdAndDelete(blogId);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }

    if(!blog){
        return res.status(404).json({message: "No blog to delete!"});
    }

    return res.status(200).json({message: "Blog deleted successfully!"});
}