import { pool } from "../db/db.js";

const saveAddress = async () => {
    try {
        const userId = req.user.id;

        const userAddress = await pool.query('SELECT * FROM shippingAddress WHERE user_id = $1;', [userId])

        if(userAddress.rows.length < 0) {
            return res.status(202).json({message: "Proceed to checkout", userAddress})
        }

        const { address_line1, address_line2, city, state, pincode } = req.body;

        if (!address_line1 || !city || !state || !pincode) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const address = await pool.query("INSERT INTO shippingAddress (user_id, address_line1, address_line2, city, state, pincode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [
            userId, address_line1, address_line2 || null, city, state, pincode
        ]);

        return res.status(202).json({message: "Proceed to checkout", address})
    } catch (error) {
        console.log(object)
    }
}

export {
    saveAddress
}