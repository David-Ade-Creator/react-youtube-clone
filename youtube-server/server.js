import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import videoRoutes from './routes/videoRoutes';
import subscribeRoutes from './routes/subscribeRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';


const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology: true ,
    useCreateIndex: true
}).catch(error => console.log(error.reason));


const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use('/uploads', express.static('uploads'));



app.listen(config.port, () => {
    console.log(`server started at http://localhost:${config.port}`)
})