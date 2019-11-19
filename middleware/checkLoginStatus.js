function protectUserRoute(req, res, next) {
  const isAuthorized = req.session.currentUser;
  if (isAuthorized) {
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
    res.redirect("/signin");
  }
  next();
}

module.exports = protectUserRoute;
