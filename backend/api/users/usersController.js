/*** IMPORTS ***/
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./userModel.js";

/*** Variables ***/
//todo move this variable to .env file
export const JWT_SECRET = "ankit123";

/** Get current user
 * @route /api/users/me
 * @access private
 */
export const getMe = asyncHandler(async (req, res) => {
    console.log("me")

    const user = { id: req.user._id, email: req.user.email, name: req.user.name }

    return res.status(200).json(user)
})

/** Register a new user
 * @route /api/users
 * @access public
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validate
    if (!name || !email || !password) {
        res.status(400)
        throw new Error({ message: "Please include all fields" });
    }

    //Check if user already exist
    const userExist = await User.findOne({ email: email })

    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({ name: name, email: email, password: hashedPassword })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error("Invalid user data")
    }
})

/** Login user
 * @route /api/users/login
 * @access public
 */
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //if user is found then check if user's email and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }


})

/** Generate jwt token
 * @param {string} user id  
 * @return {string} jwt token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "30d"
    })
}
