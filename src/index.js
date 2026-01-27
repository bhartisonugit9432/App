import connectDB from "./db/index.js";

import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({
  path: "src/.env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    app.listen();
    console.error("Mongodb connection failed !!! ", error);
  });

/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`);
    app.on("error", (error) => {
      console.log("ERROR : ", error);
      throw error;
    });
    app.listen(process.env.PORT, ()=>{
        // console.log(`Server is, running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
})();

*/
