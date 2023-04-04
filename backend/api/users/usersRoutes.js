/*** IMPORTS ***/
import express from "express";
import { loginUser,registerUser, getMe } from "./usersController.js";
import { protectRoute } from "../../middlerware/authController.js";

const router = express.Router();

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protectRoute, getMe);


export default router;