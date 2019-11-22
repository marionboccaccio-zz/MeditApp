const express = require("express");
const router = new express.Router();
const flash = require("flash");
const user = require("./../models/user");
const bcrypt = require("bcrypt");
const protectUserRoute = require("./../middleware/checkLoginStatus");

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
  user.findOne({ email: req.body.email }).then(dbRes => {
    if (!dbRes) {
      req.flash("error", "Wrong credentials");
      res.redirect("/signin");
    } else {
      if (bcrypt.compareSync(req.body.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        req.flash("success", "Welcome");
        res.redirect("/");
      }
      req.flash("error", "wrong credentials");
      res.redirect("/signin");
    }
  });
});

// LOG OUT
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.locals.isLoggedIn = undefined;
    res.redirect("/signin");
  });
});
// My Account
router.get("/my-account", (req, res) => {
  res.render("myAccount", {
    user: req.session.currentUser
  });
});

router.post("/edit-account/:id", (req, res) => {
  const updateUser = req.body;
  user
    .findOneAndUpdate({ _id: req.params.id }, updateUser, { new: true })
    .then(dbres => {
      req.session.currentUser = dbres;
      res.send(dbres);
    })
    .catch(err => console.log(err));
});

module.exports = router;
