const User = require("../models/User");
const router = require("express").Router(); //creating a new router obj to handle requests
const bcrypt = require("bcrypt")

//update user
router.put("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set : req.body});

            res.status(200).json("Details updated")
        } catch (err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("Wrong id")
    }
})

//retrieve a user from db
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc  
        //Basically we are omitting the fields password and updatedAt. 
        //Everything apart from those will be returned. this statement (line 34) is a bit unclear in terms of syntax; more research is required
        
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete a user
router.delete("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been deleted")
        } catch (err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("Wrong id")
    }
})

//follow user
router.put("/:id/follow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id); //who we are looking to follow
            const currUser = await User.findById(req.body.userId); //the user themself

            if(!user.followers.includes(req.body.userId)) { //if who the user is trying to follow isn't already included in the user's followers
                await user.updateOne({$push:{followers : req.body.userId}}); //Look into this syntax {$push : ...etc}. From my observation this is used when dealing with arrays?
                await currUser.updateOne({$push:{following : req.params.id}});
                res.status(200).json("You are now following this user");
            } else {
                res.status(403).json("You are aleady following this user") //I'd like to add the name of the user instead of just user. Look into this.
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(400).json("You cannot follow yourself. Please select another user")
    }
})

//unfollow user

router.put("/:id/unfollow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id); //who we are looking to follow
            const currUser = await User.findById(req.body.userId); //the user themself

            if(user.followers.includes(req.body.userId)) { //if who the user is trying to follow isn't already included in the user's followers
                await user.updateOne({$pull:{followers : req.body.userId}}); //Look into this syntax {$push : ...etc}. From my observation this is used when dealing with arrays?
                await currUser.updateOne({$pull:{following : req.params.id}});
                res.status(200).json("Unfollowed from this user");
            } else {
                res.status(403).json("You don't follow this user") //I'd like to add the name of the user instead of just user. Look into this.
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(400).json("You cannot un-follow yourself. Please select another user")
    }
})

router.get("/", (req, res) => {
    res.send("user route")
})

module.exports = router