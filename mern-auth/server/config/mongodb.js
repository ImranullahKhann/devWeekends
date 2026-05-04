import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Connected to db"));
    
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'mern-auth'
    });
}

export default connectDB;
