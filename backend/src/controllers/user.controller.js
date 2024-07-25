import { pool } from "../db/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex pattern (example: minimum 8 characters, at least one letter and one number)
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


const generateAccessToken = async (userId, req, res) => {
  try {
    const response = await pool.query("SELECT id, email, fullname FROM users WHERE id = $1", [userId]);

    if (response.rows.length === 0) {
      throw new Error('User not found');
    }

    console.log(response.rows[0])
    const user = response.rows[0]


    const accessToken = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        dob: user.dob
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    );

    return accessToken;
  } catch (error) {
    console.log('Error generating access token:', error);
    throw new Error('Something went wrong while generating access token');
  }
};

const generateRefreshToken = async (userId) => {
  const refreshToken = await jwt.sign(
    {
      id: userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );

  await pool.query("UPDATE users SET refreshToken = $1 WHERE id = $2", [refreshToken, userId])

  return refreshToken

};

const generateAccessRefreshTokens = async (userId, req, res) => {
  try {
    const accessToken = await generateAccessToken(userId)
    const refreshToken = await generateRefreshToken(userId)
    console.log("AccessToken", accessToken)
    console.log("refreshToken", refreshToken)

    if (!accessToken && !refreshToken) {
      return res.status(502).json({ message: "Error while generating tokens!!" })
    }

    return { accessToken, refreshToken }
  } catch (error) {
    console.error('Error:', error)
    throw new Error("Something went wrong while generating tokens");
  }
};


const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phone_number } = req.body

    if (!fullname || !email || !password || !phone_number) {
      return res.status(400).json({
        message: "Please provide all fields"
      })
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Invalid email"
      })
    }

    if (!passwordPattern.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain both letters and numbers" })
    }

    const existedUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    )

    if (existedUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword.length)

    const user = await pool.query(
      "INSERT INTO users (fullname, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [fullname, email, hashedPassword, phone_number]
    )


    // console.log(token)
    return res.status(201).json({ data: user.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(406).json({ message: "Please provide all the fields!" })
    }

    const existedUser = await pool.query(
      "SELECT id, email, password, fullname FROM users WHERE email = $1",
      [email]
    );

    // console.log(existedUser.rows[0]);

    if (!existedUser.rows[0]) {
      return res.status(501).json({ message: "Invalid Credentials" })
    }

    const userPassword = existedUser.rows[0].password

    const isPasswordMatch = await bcrypt.compare(password, userPassword);

    if (!isPasswordMatch) {
      return res.status(501).json({ message: "Invalid Credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessRefreshTokens(existedUser.rows[0].id)

    const accessOptions = {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000
    }

    const refreshOptions = {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000
    }

    existedUser.rows[0].password = ""
    const loggedUser = existedUser.rows[0]

    res.cookie("accessToken", accessToken, accessOptions)
    res.cookie("refreshToken", refreshToken, refreshOptions)
    console.log("tokens:", accessToken, refreshToken)
    // return res.status(200).json({message: "Done", data: loggedUser})
    return res
      .status(200)
      .json({
        message: "Login Successful",
        accessToken,
        refreshToken,
        loggedUser
      })
  } catch (error) {
    console.log('Error from loginUser ~line 67:', error)
    return res.status(501).json({ message: "Internal server error" })
  }
};

const logoutUser = async (req, res) => {
  const activeUser = await pool.query('SELECT id FROM users WHERE id = $1', [req.user.id])

  if (!activeUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const refresh = await pool.query('UPDATE users SET refreshToken = $1 WHERE id = $2 RETURNING refreshToken;', [null, req.user.id])
  // console.log("Rfrs:", refresh.rows[0])

  const accessOptions = {
    httpOnly: true,
    secure: false,
    maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000
  }

  const refreshOptions = {
    httpOnly: true,
    secure: false,
    maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000
  }

  res
    .status(200)
    .clearCookie("refreshToken", refreshOptions)
    .clearCookie("accessToken", accessOptions).json({ message: "User Logout" })
}


const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const query = 'SELECT * FROM products WHERE product_id = $1';
    const values = [productId];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product: result.rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const { category, product_name } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";
    const queryObject = [];

    if (category) {
      query += " AND category ~ $1";
      queryObject.push(category);
    }

    if (product_name) {
      query += ` AND product_name ~ $${queryObject.length + 1}`;
      queryObject.push(product_name);
    }

    if (!category || !product_name) {
      return getAllProducts(req, res);
    }

    console.log("lin 83:", queryObject, query);

    const { rows: products } = await pool.query(query, queryObject);

    if (products.length == 0) {
      return res.status(400).json({ message: "Data not found!" });
    }

    return res.status(200).json({ products });
  } catch (error) { }
};

const getProductByPrice = async (req, res) => {
  try {
    const { min_price, max_price } = req.query;

    if (!max_price) {
      return getAllProducts(req, res);
    }

    const { rows: products } = await pool.query(
      "SELECT * FROM products WHERE price <= $1;",
      [max_price]
    );

    if (products.length == 0) {
      return res.status(400).json({ message: "Not found!" });
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error at getProductByPrice:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { size, product, quantity } = req.body;
    console.log("line 300:", req.body);

    if (!size || !product || !quantity) {
      return res.status(400).json({ message: "No product details" });
    }


    // Check if the user has an active cart
    const activeCartResult = await pool.query(
      "SELECT * FROM Carts WHERE user_id = $1 AND status=\'ACTIVE\'; ",
      [req.user.id]
    );

    console.log("Active cart query result:", activeCartResult.rows)

    let cart;
    // If no active cart exists, create a new one
    if (activeCartResult.rows.length === 0) {
      const newCartResult = await pool.query(
        "INSERT INTO Carts (user_id, status) VALUES ($1, \'ACTIVE\') RETURNING *;",
        [req.user.id]
      );
      cart = newCartResult.rows[0];
      console.log("New cart created:", cart)
    } else {
      cart = activeCartResult.rows[0];
      console.log("Existing cart found: ", cart)
    }

    // Check if the product is already in the cart
    const cartProductResult = await pool.query(
      "SELECT * FROM CartItems WHERE cart_id = $1 AND product_id = $2;",
      [cart.id, product.product_id]
    );

    if (cartProductResult.rows.length === 0) {
      // If product is not in the cart, add it
      await pool.query(
        "INSERT INTO CartItems (cart_id, product_id, size, quantity, product_img, product_name, price) VALUES($1, $2, $3, $4, $5, $6, $7);",
        [cart.id, product.product_id, size, quantity, product.productimgurl, product.product_name, product.price]
      );
    } else {
      // If product is already in the cart, update the quantity
      await pool.query(
        "UPDATE CartItems SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3;",
        [quantity, cart.id, product.product_id]
      );
      console.log("Product quantity updated in cart:",product.product_name)
    }

    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const viewCart = async (req, res) => {
  //1.retrieve the userId when user hits the endpoint
  //2.fetch cart_id corresponding to the userId
  //3.Using cart_id fetch cartItems corresponding to it
  //4.Return

  const userId = req.user.id
  console.log("viewcart userid:", userId)

  const cartId = await pool.query("SELECT id FROM carts WHERE user_id = $1 AND status=\'ACTIVE\'", [
    userId
  ]);
  console.log("line:369", cartId.rows)

  if (cartId.rows.length === 0) {
    return res.status(404).json({ message: "Cart does'nt exist!" });
  }

  const cartItems = await pool.query(
    "SELECT * FROM CartItems WHERE cart_id = $1",
    [cartId.rows[0].id]
  );

  // console.log(cartItems.rows);
  return res.status(200).json(cartItems.rows);
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshOptions || req.body.refreshToken

    if (!incomingRefreshToken) {
      return res.status(502).json({ message: "Unauthorized request" })
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await pool.query("SELECT id, fullname, email, phone_number FROM users WHERE id = $1;", decodedToken?.id)

    if (user.rows.length === 0) {
      return res.status(502).json({ message: "Unauthorized request" })
    }

    if (incomingRefreshToken != user.rows[0]?.refreshToken) {
      return res.status(502).json({ message: "Refresh toke expired or used" })
    }

    const accessOptions = {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000
    }

    const refreshOptions = {
      httpOnly: true,
      secure: false,
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10) * 24 * 60 * 60 * 1000
    }

    const { accessToken, newRefreshToken } = await generateAccessRefreshTokens(user.rows[0].id)

    return res
      .status(200)
      .cookie("newrefreshToken", newRefreshToken, refreshOptions)
      .cookie("accessToken", accessToken, accessOptions)
      .json({ message: "AccessToken refreshed", accessToken, newRefreshToken })
  } catch (error) {
    console.log("error:", error)
    return res.status(502).json({ message: "Server Error" })
  }
}

export {
  registerUser,
  getCategoryProducts,
  getProductByPrice,
  addToCart,
  getProductById,
  viewCart,
  loginUser,
  logoutUser,
  refreshAccessToken
};
