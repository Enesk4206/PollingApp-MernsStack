const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

};

exports.registerUser = async (req, res) => {
    const { fullName, username, email, password, profileImageUrl } = req.body;

    //Validation
    if (!fullName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });

    }
    //Validation Check Username
    //allows alpha numeric characters

    const usernameRegex = /^[a-zA-Z0-9-]+$/
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: "Invalid username. Only alphanumeric characters hypens are allowed. No spaces are permitted" });
    }
    try {
        //check email already exist
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use" });
            
        }
        //check username already exist
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already in use. Try another one" });
        }


        //CREATE THE USER
        const user = await User.create({
            fullName,
            username,
            email,
            password,
            profileImageUrl,

        });

        res.status(200).json({
            id: user._id,
            user,
            token : generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: "Error registiring user", error: error.message });
    }

}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });

        }
        res.status(200).json({
            id: user._id,
            user: {
                ...user.toObject(),
                totalPollsCreated: 0,
                totalPollsVotes: 0,
                totalPollsBookmarked: 0,
            },
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Error registiring user", error: error.message });
    }
}


exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        //add the new attributes to the response
        const userInfo = {
            ...user.toObject(),  //come from mongodb func
            totalPollsCreated:0,
            totalPollsVotes:0,
            totalPollsBookmarked:0

        };
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ message: "Error registiring user", error: error.message });

    }
}
