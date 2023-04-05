/*** IMPORTS ***/
import express from "express";
import protectRoute from "../../middlerware/authController.js";
import { getTickets, createTicket, getTicket, deleteTicket, updateTicket } from "./ticketController.js";

const router = express.Router();

router.route("/").get(protectRoute, getTickets).post(protectRoute, createTicket)
router.route("/:id").get(protectRoute, getTicket).delete(protectRoute, deleteTicket).put(protectRoute, updateTicket);


// alternative way to create different router compare to one on top
// router.get("/", protectRoute, getTickets)
// router.post("/", protectRoute, createTickets)


export default router;