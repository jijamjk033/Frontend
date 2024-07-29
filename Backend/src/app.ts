import express from 'express';
import { mongooseConnection } from '../src/config/connection'; 
import router from '../src/routes/route';// assuming you have a separate file for mongoose configuration
require('dotenv').config();
import cors from 'cors'
import path from 'path';



export const config = {
  mongooseConnection,
};
config.mongooseConnection();

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
}))
app.use(express.json())
app.use('/',router);
app.use(express.static(path.join(__dirname,"uploads")));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
