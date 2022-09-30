//THIS CONTAINS THE USER SCHEMA: I.E., ALL INFO PERTAINING TO USERS OF THIS SOCIAL MEDIA APP
const mongoose = require("mongoose")

//Creating a new schema with the following fields
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true,
        min: 8,
    },

    profilePicture : {
        type: String,
        default: ""
    },

    coverPicture : {
        type: String,
        default: ""
    },

    followers : {
        type: Array,
        default: []
    },

    following : {
        type: Array,
        default: [] 
    },
    
    isAdmin : {
        type: Boolean,
        efault: false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", userSchema);