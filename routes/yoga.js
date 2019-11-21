const express = require("express");
const router = new express.Router();
const user = require("./../models/user");
const studioModel = require("./../models/studio");
const uploader = require("./../config/cloudinary");

router.get("/yoga", (req, res) => {
  res.render("yoga", {
    user: req.session.currentUser
  });
});

router.get("/studio/:place_id", (req, res) => {
  console.log("ici");
  studioModel
    .findOne({ place_id: req.params.place_id })
    .then(dbRes => {
      if (dbRes) {
        res.render("studio-yoga", { studio: dbRes });
      } else {
        studioModel
          .create({ place_id: req.params.place_id })
          .then(createdStudio => {
            res.render("studio-yoga", { studio: createdStudio });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(dbErr => res.render("studio-yoga"));
});

router.post("/edit-studio/:id", uploader.single("picture"), (req, res) => {
  const query = {};
  if (req.file) {
    query.$push = { picture: req.file.secure_url };
  }
  if (req.body.link !== "") {
    query.link = req.body.link;
  }
  // newData.link = req.body.link;
  console.log(query);
  studioModel
    .findByIdAndUpdate(req.params.id, query, { new: true })
    .then(dbRes => {
      console.log(dbRes);
      res.send("Ok");
    })
    .catch(dbErr => console.log(dbErr));
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
