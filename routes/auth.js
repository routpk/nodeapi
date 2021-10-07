const router = require("express").Router();
const User = require(`../models/User`)

const { body, validationResult } = require("express-validator");

router.post('/signup',
    body('email','Please Provide valid Email').isEmail(),
    body('password','Please Provide a Valid Password length').isLength({ min: 6 }),
    body('name','Name field Should be minimum 6 Char in Length').isLength({ min: 6 }),
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