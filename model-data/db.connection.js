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
    throw Error("MongoDB error: " + error.message);
  }
};

const stopConnection = async () => {
  await mongoose.disconnect();
  console.log("Connection to the db closed...");
};

export { startConnection, stopConnection };
// module.exports = getConnection
