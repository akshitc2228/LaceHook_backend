//THIS CONTAINS THE POST SCHEMA: I.E., ALL THE POSTS MADE BY A USER
const mongoose = require("mongoose")

//Creating a new schema with the following fields
const PostSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },

    description : {
        type: String,
        max: 500
    },

    img : {
        type: String
    },

    likes : {
       type: Array,
       default: [] 
    }
},
{timestamps: true} //When set to true, the mongoose creates two fields as follows: createdAt: Date representing when the document was created. updatedAt: Date representing when this document was last updated.
);

//The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports = mongoose.model("Post", PostSchema); 