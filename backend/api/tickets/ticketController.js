/*** IMPORTS ***/
import asyncHandler from "express-async-handler";
import User from "../users/userModel.js";
import Ticket from "./ticketsModel.js";

/** 
 * @description Get tickets for authorized user
 * @route /api/tickets
 * @access private
*/
export const getTickets = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets)

})


/** 
 * @description Create ticket for authorized user
 * @route /api/tickets
 * @access private
*/
export const createTicket = asyncHandler(async (req, res) => {

    const { product, description } = req.body;
    if (!product, !description) {
        res.status(400)
        throw new Error("Please add product and description")
    }

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //create ticket
    const newTicket = await Ticket.create({
        product: product,
        description: description,
        user: req.user.id,
        status: "new"
    })

    res.status(201).json(newTicket);

});


/** 
 * @description CGet single ticket authorized user
 * @route /api/tickets/:id
 * @access private
*/
export const getTicket = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authirized")
    }

    res.status(200).json(ticket)
});


/** 
 * @description delete ticket
 * @route /api/tickets/:id
 * @access private
*/
export const deleteTicket = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authirized")
    }


    await Ticket.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "Ticket deleted" })
});

/** 
 * @description Update ticket
 * @route /api/tickets/:id
 * @access private
*/
export const updateTicket = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authirized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
});