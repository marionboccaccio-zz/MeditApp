const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/yoga", (req, res) => {
  res.render("yoga", {
    user: req.session.currentUser
  });
});

router.get("/yoga/:id", (req, res) => {
  res.render("studio-yoga");
});

module.exports = router;
