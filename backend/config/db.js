import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://aktson:success2023@akt.gormvi6.mongodb.net/akt?retryWrites=true&w=majority";


const connectDB = async () => {

    try {
        // const connect = await mongoose.connect(process.env.MONGO_URI, 
        const connect = await mongoose.connect(MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        console.log(`Mongodb connected: ${connect.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;