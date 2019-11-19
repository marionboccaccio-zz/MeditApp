const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home");
});

// router.get("/home", (req, res) => {
//   console.log("here");
//   res.render("home");
// });

module.exports = router;
