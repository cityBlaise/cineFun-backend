import mongoose from "mongoose";
import process from "node:process";
mongoose.set("strictQuery", false); 
import dotenv from "dotenv";
dotenv.config();
// initialize database connection
const databaseUrl = process.env.Mongo_prod || process.env.Mongo_dev;

const startConnection = async () => { 
  if (!databaseUrl) {
    throw Error("MongoDB connection string missing!");
  }
  try {
    await mongoose.connect(databaseUrl,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return;
  } catch (error) {  
    throw Error("*\nerror: " + error.message);
  }
};

const stopConnection = async () => {
  return await mongoose.disconnect(); 
};

export { startConnection, stopConnection }; 
