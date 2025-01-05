import { Router } from "express"
import {
  addToCart,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  viewCart,
} from "../controllers/user.controller.js"
import { removeFromCart } from "../controllers/cart.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
