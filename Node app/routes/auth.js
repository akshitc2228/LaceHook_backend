const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.get("/register", async (req, res) => {
    const user = await new User ({
        username: "firstUser",
        email: "firstUser@gmail.com",
        password: "pass_word"
    })

    await user.save()
    res.send("CLEAR!")
});

module.exports = router