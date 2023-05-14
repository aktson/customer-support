import asyncHandler from "express-async-handler";
import User from "../users/userModel.js";
import Ticket from "../tickets/ticketsModel.js";
import Note from "./noteModel.js";

/** 
 * @description Get notes for ticket
 * @route GET /api/tickets/:ticketId/notes
 * @access private
*/
export const getNotes = asyncHandler(async (req, res) => {

    //find user using Userschema and the id in jwt from request
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    return res.status(200).json(notes)

})


/** 
 * @description Create note for authorized user
 * @route POST /api/tickets/:ticketId/notes
 * @access private
*/
export const createNote = asyncHandler(async (req, res) => {

    //find user using Userschema and the id in jwt from request
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //find ticket using TicketsSchema and the id in jwt from request
    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized");
    };


    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text to create note")
    }


    //create note
    const newnote = await Note.create({
        text: req.body.text,
        ticket: req.params.ticketId,
        user: req.user.id,
        isStaff: false,
    })

    return res.status(201).json(newnote);

});


/** 
 * @description CGet single note authorized user
 * @route /api/notes/:id
 * @access private
*/
export const getNote = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const note = await note.findById(req.params.id);

    if (!note) {
        res.status(404)
        throw new Error("note not found")
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authirized")
    }

    res.status(200).json(note)
});


/** 
 * @description delete note
 * @route /api/notes/:id
 * @access private
*/
export const deleteNote = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const note = await note.findById(req.params.id);

    if (!note) {
        res.status(404)
        throw new Error("note not found")
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authirized")
    }


    await note.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "note deleted" })
});

/** 
 * @description Update note
 * @route /api/notes/:id
 * @access private
*/
export const updateNote = asyncHandler(async (req, res) => {

    //find user using the id in jwt
    const user = User.findOne(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const note = await note.findById(req.params.id);

    if (!note) {
        res.status(404)
        throw new Error("note not found")
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authirized")
    }

    const updatednote = await note.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatednote)
});