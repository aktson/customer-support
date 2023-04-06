/*** IMPORTS ***/
import mongoose from "mongoose";

const TicketsSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["Iphone", "Macbook", "IMac", "Ipad"]
    },
    description: {
        type: String,
        required: [true, "Please enter a description"],

    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new"
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model('Ticket', TicketsSchema);
export default User;
