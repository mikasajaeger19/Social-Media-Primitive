import express from 'express'
const blogRouter = express.Router();
import{getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog, getByUserId} from "../controllers/blog-controller";

blogRouter.get('/', getAllBlogs);
blogRouter.post('/create', createBlog);
blogRouter.get('/:id', getBlogById);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/delete/:id', deleteBlog);
blogRouter.get('/user/:id', getByUserId);
export default blogRouter;