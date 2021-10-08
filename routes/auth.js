const router = require("express").Router();
const User = require(`../models/User`)
const validatedSignupSchema = require("../validator/signupValidator");
const { validationResult } = require("express-validator");

router.post('/signup',
validatedSignupSchema,
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            const savedUser = await user.save();
            res.send(savedUser);

            console.log ('User Saved Successfully!!')

        } catch (err) {

        }
    });

module.exports = router