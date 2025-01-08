import User from "../models/User.js";
import bcrypt from 'bcryptjs';


export const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'All feilds are required'})
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message:'Invalid credentials'})
        }

        res.status(200).json({message: 'Login Successfully' , user: { username: user.username, email : user.email}})
    } catch (error) {
        console.log('Error loging in user:', error);
        res.status(500).json({message:error.message})
    }
}

export const register = async (req, res) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({message: 'User already exist'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        res.status(201).json({message: 'User Register Successfully'})
    } catch (error) {
        console.log('Error redgistering user:', error);
        res.status(500).json({message: error.message})
    }
}