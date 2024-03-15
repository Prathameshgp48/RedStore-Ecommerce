import express from "express";
import mongoose from "mongoose";
import { Customer } from "../../models/user.models";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Developer");
});
