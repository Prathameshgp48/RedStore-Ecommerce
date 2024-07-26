import { pool } from "../db/db.js";

const getAllProducts = async (req, res) => {
  try {
    // console.log(req.cookies.accessToken)
    const products = await pool.query("SELECT * FROM products;");
    if (products.rows.length === 0) {
      return res.status(400).json({ message: "Data not found!" });
    }
    // console.log(products);
    console.log(res.cookie)

    if (req.query.category) {
      const filterProduct = products.rows.filter(
        (product) => product.category === req.query.category
      );

      return res.status(200).json({ products: filterProduct });
    }

    if (req.params.id) {
      console.log(req.params.id);
      const product = product.rows.find(
        (product) => product.product_id === parseInt(req.params.id)
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found!" });
      }
      return res.status(200).json(product);
    }

    return res.status(200).json({ products: products.rows });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;
    console.log(productId)
    if (!productId) { return res.status(500).json({ message: "Product_id missing!" }) }

    const userCart = await pool.query("SELECT * FROM Carts WHERE user_id = $1 AND status=\'ACTIVE\';", [userId])

    if (userCart.rows.length === 0) return res.status(400).json({ message: "Active cart not found" })
    const cart_id = userCart.rows[0].id

    const removeProduct = await pool.query("DELETE FROM CartItems WHERE cart_id=$1 AND product_id =$2 RETURNING *;", [cart_id, productId])
    console.log(removeProduct.rows[0])
    if (removeProduct.rows.length === 0) return res.status(400).json({ message: "Product not found" })

    return res.status(200).json({ message: "Product Removed From the Cart!", removed: removeProduct.rows[0] })
  } catch (error) {
    console.log("Error", error)
    return res.status(500).json("Internal Server Error")
  }
}

export {
  getAllProducts,
  removeFromCart
}