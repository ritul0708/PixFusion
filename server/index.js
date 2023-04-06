import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import promptRoutes from './routes/promptRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/prompt', promptRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from PixFusion!',
  });
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server has started on port http://localhost/8080"))
  } catch (error) {
    console.log(error);
  }
}

startServer();