const router = require("express").Router();
const User = require(`../models/User`)

router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (err) {

    }

});

module.exports = router