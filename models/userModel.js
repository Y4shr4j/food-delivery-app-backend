const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'GENERAL' },
    streetAddress: { type: String },
    zipCode: { type: String },
    phoneNumber: { type: String },
}, {
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
