import mongoose from "mongoose";
import { databaseName } from "../costants.js";



const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${databaseName}`
    );
    console.log(
      `\n mongodb connected!! : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Mongodb connection error", error);
    process.exit(1);
  }
};

export default connectDB;
