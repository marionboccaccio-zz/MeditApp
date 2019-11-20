const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/meditation", (req, res) => {
  res.render("meditation", {
    user: req.session.currentUser
  });
});

module.exports = router;
