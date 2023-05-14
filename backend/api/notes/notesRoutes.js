import express from "express";
import protectRoute from "../../middlerware/authController.js";
import { createNote, deleteNote, getNote, getNotes, updateNote } from "./notesController.js";


const router = express.Router({ mergeParams: true });

router.route("/").get(protectRoute, getNotes).post(protectRoute, createNote);
// router.route("/:id").get(protectRoute, getNote).put(protectRoute, updateNote).delete(protectRoute, deleteNote)


export default router;