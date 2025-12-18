import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({

    name: String,

    email: {
        type: String,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format",
        }
    },

    password: {
        type: String,
        minLength: [4, "Min password length is 4"],
        required: [true, "Password is required"],
    }
});

const UserModel = mongoose.models.Users || mongoose.model(`Users`, userSchema);
export default UserModel; 