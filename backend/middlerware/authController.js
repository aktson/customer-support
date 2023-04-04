/*** IMPORTS ***/
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../api/users/userModel.js";
import { JWT_SECRET } from "../api/users/usersController.js";

/*** FUNCTIONS ***/

/** Protects the route, check and compares with jwt
 * @param {string} REQUEST 
 * @param {string} RESPONSE
 * @param {function} next() 
 * @return {void} object with error
 */
export const protectRoute = asyncHandler(async (req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    
        try {
          // Get token from the header 
          token = req.headers.authorization.split(" ")[1];

          // Verify token
          const decoded = jwt.verify(token, JWT_SECRET);
       
          // Get user from token
          req.user = await User.findOne(decoded._id).select("-password");

          next();

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }
    if(!token) {
        res.status(401)
        throw new Error("Not authorized")
    }
})