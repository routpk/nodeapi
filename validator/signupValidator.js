
const { body } = require("express-validator");

const signUpSchemaValidation = [
    body('email', 'Please Provide a valid Email Address').isEmail().exists({ checkFalsy: true, checkNull: true }),
    body('password', 'Please Provide a Valid Password length').isLength({ min: 6 }).exists({ checkFalsy: true, checkNull: true }),
    body('name', 'Name field Should be minimum 6 Char in Length').isLength({ min: 6 }).exists({ checkFalsy: true, checkNull: true })];

const loginSchemaValidation = [
    body('email', 'Please Provide a valid Email Address').isEmail().exists({ checkFalsy: true, checkNull: true }),
    body('password', 'Please Provide a Valid Password length').isLength({ min: 6 }).exists({ checkFalsy: true, checkNull: true })];
   

    module.exports = signUpSchemaValidation
    