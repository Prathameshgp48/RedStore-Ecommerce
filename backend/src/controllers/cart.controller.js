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

  export {
    getAllProducts
  }