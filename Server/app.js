import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRoute from './routes/user.routes.js'
import blogRoute from './routes/blog.routes.js'
import './utils/connection.js'

// initialize the app
const app = express();

// Load environment variables
configDotenv();

// initialize the port
// const PORT  = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.use(cors());


// text route
app.get('/', (req,res) => {
    res.send("Hello Server Is Running")
});

// app routes
app.use('/api/user', userRoute)
app.use('/api/blog', blogRoute)

// run the server
// app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));
