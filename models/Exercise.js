const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({  
    type: { 
        type: String, 
        enum: ['resistance', 'cardio']
    },

    name: {
        type: String,
        trim: true
    },

    duration: {
        type: Number
    },
    
    weight: {
        type: Number
    },

    reps: {
        type: Number
    },

    sets: {
        type: Number
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;