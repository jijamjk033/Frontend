import mongoose from 'mongoose';

require('dotenv').config();

function mongooseConnection() {
    mongoose.set('strictQuery', true);

  
let url:string=String(process.env.MONGOOSE_CONNECTION)
    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

export { mongooseConnection };
