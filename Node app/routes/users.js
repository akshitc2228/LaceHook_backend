const User = require("../models/User");
const router = require("express").Router(); //creating a new router obj to handle requests
const bcrypt = require("bcrypt")

//update user
router.put("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.user.isAdmin) {
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
//delete a user
router.put("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.user.isAdmin) {
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

//follow user
//unfollow user

router.get("/", (req, res) => {
    res.send("user route")
})

module.exports = router