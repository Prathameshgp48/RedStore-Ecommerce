import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import pkg from "pg";

const { Pool } = pkg;

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );
//     console.log(
//       `\nMongoDB connection SUCCESSFUL!!\n DB HOST:${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MongoDB connection FAILED", error);
//     process.exit(1);
//   }
// };

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

//testing purpose for deploying
const isRenderEnv = process.env.RENDER === "true"

const pool = new Pool({
  connectionString: isRender? process.env.DATABASE_URL: process.env.EXT_DATABASE_URL, // Use single connection string
  ssl: isRenderEnv? false: { rejectUnauthorized: false },
})

const connectDB = async () => {
  try {
    await pool.connect();
    console.log(
      `Connection Successful!!\n Host:${pool.options.host}, Port:${pool.options.port}, Database:${pool.options.database}`
    );

  } catch (error) {
    console.log("connection FAILED", error);
    process.exit(1);
  }
};

export { connectDB, pool };
