
const { body } = require("express-validator");

const loginSchemaValidation = [
    body('email', 'Please Provide a valid Email Address').isEmail().exists({ checkFalsy: true, checkNull: true }),
    body('password', 'Please Provide a Valid Password length').isLength({ min: 6 }).exists({ checkFalsy: true, checkNull: true })];
   

    module.exports = loginSchemaValidation
    