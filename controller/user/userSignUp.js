const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name, streetAddress, phoneNumber, zipCode, role } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exists.");
        }

        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong.");
        }

        const payload = {
            email,
            password: hashPassword,
            name,
            role: role || "GENERAL",
            streetAddress,   // Save street address
            phoneNumber,     // Save phone number
            zipCode          // Save ZIP code
        };

        const newUser = new userModel(payload);
        const savedUser = await newUser.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
