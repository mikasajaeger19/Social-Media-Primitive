import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';
const app = express();

app.use(express.json());
app.use("/api/user", router)
app.use("/api/blog", blogRouter)

const URI = "mongodb+srv://naeem:naeem@blogapp.tbpsl7c.mongodb.net/Blog?retryWrites=true&w=majority"
mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
app.listen(3000, () => {
  console.log("Server started!");
}) 