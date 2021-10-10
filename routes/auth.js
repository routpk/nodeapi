const router = require("express").Router();
const User = require(`../models/User`);
const validatedSignupSchema = require("../validator/signupValidator");
const loginSchemaValidationSchema = require("../validator/loginValidator");
const { validationResult } = require("express-validator");
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", validatedSignupSchema, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Checking If User is Already in Database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email Already Exists");

    // Hash Password
    const saltBcrypt = await bCrypt.genSalt(10);
    const hashPassword = await bCrypt.hash(req.body.password, saltBcrypt);

    // New User Creation
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await user.save();

    console.log("User Saved Successfully!!");

    //res.send(savedUser);
    res.send({ saved: true, user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", loginSchemaValidationSchema, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Checking If User is Already in Database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email ID Entered Is Incorrect!");

    //Password Check
    const validPassword = await bCrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Password Entered is Incorrect!");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);


    console.log("Logged In Successfully!!");
    
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
