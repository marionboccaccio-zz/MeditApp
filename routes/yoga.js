const express = require("express");
const router = new express.Router();
const user = require("./../models/user");
const studioModel = require("./../models/studio");

router.get("/yoga", (req, res) => {
  res.render("yoga", {
    user: req.session.currentUser
  });
});

router.get("/studio/:id", (req, res) => {
  res.render("studio-yoga");
});

router.post("/studio/:place_id", (req, res) => {
  studioModel
    .find({ place_id: { $eq: req.params.place_id } })
    .then(dbRes => {
      //   if (dbRes) {
      //     console.log("Studio présent dans la DB");
      //     // update the model
      //   } else {
      //     console.log("Pas de studio dans la DB");
      //     studioModel
      //       .create(req.body)
      //       //create a model with the info entered on the site
      //       .then(result => {
      //         console.log(result);
      //         //display the results
      //       });
      //   }
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

module.exports = router;
