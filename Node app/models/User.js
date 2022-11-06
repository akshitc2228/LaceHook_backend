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
    },

    description : {
        type: String,
        max: 50
    },

    city : {
        type: String,
        max: 50
    },

    from : {
        type: String,
        max: 50
    },

    relationshipStatus : {
        type: Number,
        enum: [1,2,3]
    }
},
{timestamps: true} //When set to true, the mongoose creates two fields as follows: createdAt: Date representing when the document was created. updatedAt: Date representing when this document was last updated.
);

//The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports = mongoose.model("User", userSchema); 