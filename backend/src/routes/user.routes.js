import { Router } from "express";
import mongoose from "mongoose";
// import { Customer } from "../../models/user.models";
import {
  addToCart,
  getAllProducts,
  getCategoryProducts,
  getProductById,
  getProductByPrice,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  viewCart,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/category").get(getCategoryProducts);
router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductById)
router.route("/price").get(getProductByPrice);
router.route("/cart").post(addToCart);
router.route("/cart").get(viewCart);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
