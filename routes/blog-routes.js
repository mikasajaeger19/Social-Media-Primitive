import express from 'express'
const router = express.Router();
import{getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog} from "../controllers/blog-controller";

router.get('/', getAllBlogs);
router.post('/create', createBlog);
router.get('/:id', getBlogById);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);