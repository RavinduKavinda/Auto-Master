const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const userAuth = { auth: false };
  if (req.oidc.isAuthenticated()) {
    userAuth.auth = true;
    userAuth.id = req.oidc.user.sub;
  }
  res.render("home", { userAuth });
});

module.exports = router;
