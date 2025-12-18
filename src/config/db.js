import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`db connected`)
        mongoose.connection.on('error', (err) => {
            console.error(`db connection error `, err)
        })
    } catch (error) {
        console.error(`could not connect to db : `, error.toString())
    }
}

export default connectToDb;