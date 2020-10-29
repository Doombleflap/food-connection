// Documentation by Andrew Glenn 10/22/2020

// Schema to log into the database(?)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema to be used in the database to create tables to receive entries
// Each element is a column in the database
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3 
    },
    calories: {
        type: Number,
        required: true,
        trim: true,
    },
    protein: {
        type: Number,
        required: true,
        trim: true,
    },
    carbs: {
        type: Number,
        required: true,
        trim: true,
    },
    fat: {
        type: Number,
        required: true,
        trim: true,
    },
    healthScore: {
        type: Number,
        default: 0,
        trim: true,
    },
    price: {
        type: Number,
        default: 0,
        trim: true,
    },
    restaurant: {
        type: Object,
        required: true,
        trim: true,
    },
    micronutrients: {
        type: Array,
        default: [],
        trim: true,
    },
    allergens: {
        type: Array,
        default: [],
        trim: true,
    },
    addedSugar: {
        type: Boolean,
        default: false,
    },
    fiber: {
        type: Number,
        default: 0,
    }
},);

// Inputs schema data into a model named 'Food' (to be used for data input?)
const Food = mongoose.model('Food', userSchema);
module.exports = Food;
