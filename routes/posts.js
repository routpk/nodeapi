const router = require("express").Router();
const varifyToken = require("./varifyToken");


router.get("/", varifyToken, async (req, res) => {
  try {
    res.json({
      posts: {
        title: "Access Check For Random Users",
        description: "Access restricted for Random Users!",
      },
    });

    //res.status(200).send("Token Varified Successfully!!");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
