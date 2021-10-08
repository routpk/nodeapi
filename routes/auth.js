const router = require("express").Router();
const User = require(`../models/User`)
const validatedSignupSchema = require("../validator/signupValidator");
const { validationResult } = require("express-validator");
const bCrypt = require('bcryptjs');


router.post('/signup',
    validatedSignupSchema,
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Checking If User is Already in Database
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) return res.status(400).send('Email Already Exists');

            // Hash Password
            const saltBcrypt = await bCrypt.genSalt(10);
            const hashPassword = await bCrypt.hash(req.body.password, saltBcrypt);


            // New User Creation
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            });

            const savedUser = await user.save();

            //res.send(savedUser);
            res.send({ saved: true, user: user._id });

            console.log('User Saved Successfully!!')

        } catch (err) {

        }
    });

module.exports = router