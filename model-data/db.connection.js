import mongoose from "mongoose";
import process from "node:process";
mongoose.set("strictQuery", false);
import credentials from "./../credentials.js";
import dotenv from "dotenv";
dotenv.config();
// initialize database connection
const databaseUrl =
  process.env?.NODE_ENV === "production"
    ? process.env.Mongo_prod
    : process.env.Mongo_dev;

const startConnection = async () => {
  let a;
  if (!databaseUrl) {
    throw Error("MongoDB connection string missing!");
  }
  try {
    await mongoose.connect(databaseUrl,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connection to the db established...");
    return;
  } catch (error) {
    console.log("MongoDB error:", error.message);
    throw Error("MongoDB error: " + error.message);
  }
};

const stopConnection = async () => {
  await mongoose.disconnect();
  console.log("Connection to the db closed...");
};

export { startConnection, stopConnection };
// module.exports = getConnection
