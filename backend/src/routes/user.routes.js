import { Router } from "express"
import {
  addToCart,
  getCategoryProducts,
  getProductById,
  getProductByPrice,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  viewCart,
} from "../controllers/user.controller.js"
import { getAllProducts, removeFromCart } from "../controllers/cart.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { userAddress, updateAddress, checkout, verifyOrder, userOrders } from "../controllers/order.controller.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/category").get(getCategoryProducts)
router.route("/products").get(getAllProducts)
router.route("/products/:id").get(getProductById)
router.route("/price").get(getProductByPrice)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/addtocart").post(verifyJWT, addToCart)
router.route("/cart").get(verifyJWT, viewCart)
router.route("/useraddress").get(verifyJWT, userAddress)
router.route("/updateaddress").post(verifyJWT, updateAddress)
router.route("/order/checkout").post(verifyJWT, checkout)
router.route("/verifyorder").post(verifyJWT, verifyOrder)
router.route("/myorders").post(verifyJWT, userOrders)
router.route("/removefromcart").post(verifyJWT, removeFromCart)

export default router;
