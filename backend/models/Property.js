const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Schema.Types.ObjectId, // Correct usage for ObjectId
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 8 // Correct property name is 'minlength' for strings
    },
    type: {
        type: String,
        enum: ["beach", "mountain", "village"], // Removed the extra comma in "beach,"
        required: true
    },
    desc: {
        type: String,
        required: true,
        minlength: 20 // Correct property name is 'minlength' for strings
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    beds: {
        type: String,
        required: true,
        minlength: 2 // Correct property name is 'minlength' for strings
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema); // Use capital 'P' for model name by convention
