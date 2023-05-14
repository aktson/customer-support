/*** IMPORTS ***/
import Express from "express";
import errorHandler from "./middlerware/errorMiddlware.js";
import connectDB from "./config/db.js";
import usersRoutes from "./api/users/usersRoutes.js";
import ticketRoutes from "./api/tickets/ticketRoutes.js";
import notesRoutes from "./api/notes/notesRoutes.js";
import cors from "cors";

const app = Express();

//BODY PARSER RECEIVED FROM REQUEST
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000'
}));


//INDEX ROUTE
app.get("/", (req, res) => {
    res.status(200).send("Hello there")
})


//CONNECT TO DATABSE
connectDB();


// ROUTES
/* user routes */
app.use("/api/users", usersRoutes)

/* ticket routes */
app.use("/api/tickets", ticketRoutes)

/* notes routes */
// app.use("/api/notes", notesRoutes)


//MIDDLEWARE
app.use(errorHandler);


//RUN SERVER ON 5000
app.listen(5000, console.log("server running on 5000"));

