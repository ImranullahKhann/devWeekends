import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
    try { 
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing Details"});
        }

        const existingUser = await userModel.findOne({email})

        if (existingUser) {
            return res.json({ success: false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod' ? true : false,
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Sending welcome email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Welcome to my site",
            text: `We welcome you warmly to this demo website. Your account has been created with email id: ${email}`
        };
        
        await transporter.sendMail(mailOptions);

        return res.json({ success: true})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required'});
        }
        
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: 'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod' ? true : false,
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true})
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod' ? true : false,
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        return res.json({ success: true, message: "Logged out"});
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}
