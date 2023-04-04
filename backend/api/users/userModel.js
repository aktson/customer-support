/*** IMPORTS ***/
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name: {
        type:String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        uniques: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    }

}, 
    {
        timestamps: true  
    }
)

const User = mongoose.model('User', UserSchema);
export default User;
