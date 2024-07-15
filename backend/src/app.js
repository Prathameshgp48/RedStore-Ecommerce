import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js"
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true , limit: "50mb"}));
app.use(cookieParser());

//route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v2/admin", adminRouter)

export { app };
