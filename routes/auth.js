const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

const user = require("./../");
const bcrypt = require("bcrypt");
const protectUserRoute = require("../middleware/checkLoginStatus");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

//SIGN UP
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  user
    .findOne({ email: req.body.email })
    .then(dbRes => {
      if (dbRes) {
        req.flash("error", "You already have an account, please signin :)");
        res.redirect("/signin");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashed;

        user.create(req.body).then(result => {
          req.session.currentUser = result;
          req.flash("success", "Welcome");
          res.redirect("/");
        });
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

// SIGN IN
router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", (req, res) => {
  user
    .findOne({ email: req.body.email })
    .then(dbRes => {
      if (!dbRes) {
        req.flash("error", "You don't have an account yet. Please sign up");
        res.redirect("/signup");
      } else {
        if (bcrypt.compareSync(req.body.password, dbRes.password)) {
          req.session.currentUser = dbRes;
          req.flash("success", "Welcome");
          res.redirect("/");
        }
        req.flash("error", "wrong credentials");
        res.redirect("/signin");
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

// LOG OUT
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.locals.isLoggedIn = undefined;
    res.redirect("/signin");
  });
});
module.exports = router;
