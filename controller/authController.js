const user = require('../models/user');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kirantirmale2362001@gmail.com',
        pass: 'vcaa icfg bkdr uokx'
    }
}); 

exports.signup = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email });

        if (!data) {
            const mailOptions = {
                from: 'kirantirmale2362001@gmail.com',
                to: req.body.email,
                subject: 'Welcome to Our Platform',
                html: `<p>Hi ${req.body.username},</p>
                       <p>Thank you for signing up. Please log in and explore the platform.</p>
                       <p>Regards,</p>
                       <p>Kiran Tirmale</p>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            const newUser = {
                ...req.body,
            };
            const savedUser = await user.create(newUser);

            return res.status(200).json({ data: savedUser, status: true ,message: "Signup successful!"});
        } else {
            return res.status(200).json({ message: "User already exists" });
        }
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ message: "Something went wrong" });
    }
};

exports.login = async (req, res) => {
    try {
        console.log('Login request received:', req.body);

        const userData = await user.findOne({ email: req.body.email });

        if (!userData) {
            console.log("User not found with email:", req.body.email);  
            return res.status(401).json({
                message: "Invalid email or password",
                status: false
            });
        }

        if (userData.password !== req.body.password) {
            console.log("Password mismatch for user:", req.body.email); 
            return res.status(401).json({
                message: "Invalid email or password",
                status: false
            });
        }

        const token = jwt.sign({
            userid: userData.userid,
            email: userData.email,
            role: userData.role
        }, 'kiran@123', { expiresIn: '10h' });

        console.log("Login successful for user:", req.body.email); 

        return res.status(200).json({
            message: "Successfully logged in",
            status: true,
            token: token,
            role: userData.role,
            employeeId: userData._id 
        });
    } catch (error) {
        console.error("Error during login:", error);  
        return res.status(500).json({
            message: "Server error, please try again later",
            status: false
        });
    }
};
