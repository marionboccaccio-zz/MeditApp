const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/yoga", (req, res) => {
  res.render("yoga");
});

module.exports = router;
