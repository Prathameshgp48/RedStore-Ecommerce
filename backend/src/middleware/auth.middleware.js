import jwt from "jsonwebtoken"
import { pool } from "../db/db.js"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Request" })
        }
    
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await pool.query("SELECT id, fullname, email from users WHERE refreshToken = $1;", [decodedToken])
    
        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" })
        }
    
        req.user = user
        next()
    } catch (error) {
        console.log("Error", error)
        return res.status(401).json({ message: "Invalid Access Token" })
    }
}