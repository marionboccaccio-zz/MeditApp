const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(dbConnectionResult =>
    console.log("connected", () => console.log("yay mongodb connected :)"))
  )
  .catch(err => {
    console.error("error", () => console.log("nay db error sorry :("));
  });
