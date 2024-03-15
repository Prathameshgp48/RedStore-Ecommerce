import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express";

const app = express();

const port = process.env.PORT;

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("ERROR", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
