import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export const signUp = async (req, res) => {
    const {name, email, password } = req.body;

    try {

        // checking user, (if already exists)
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already registered. Please use another email'
            });
        };

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // new user
        const user = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        //  JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};


export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {

        // checking input details
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: `Crediential missing`
            });
        };

        // finding user in db
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `Account not found`
            });
        };

        // matching password
        const isPasswordmatched = await bcrypt.compare(password, user.password);
        if (!isPasswordmatched) {
            return res.status(401).json({
                success: false,
                message: `invalied password`
            });
        };
        //  JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};