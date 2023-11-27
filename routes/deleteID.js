const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Reservation = require("../models/Reservation");
const axios = require("axios");
const dotenv = require("dotenv").config();

router.post("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const userAuth = {};
    userAuth.auth = true;
    userAuth.id = req.oidc.user.sub;
    const deleteID = req.body.deleteID;
    const options = {
      method: "GET",
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userAuth.id}`,
      headers: { authorization: `Bearer ${process.env.AUTH0_MGMT}` },
    };

    await axios
      .request(options)
      .then(function (response) {
        if (response.status === 404) {
          return res.redirect("/logout");
        } else {
          userAuth.userDetails = response.data;
        }
      })
      .catch(function (error) {
        return res.redirect("/logout");
      });

    try {
      const today = new Date();

      const reservations = await Reservation.destroy({
        where: {
          username: {
            [Op.eq]: userAuth.userDetails.username,
          },
          date: {
            [Op.gt]: today,
          },
          booking_id: parseInt(deleteID),
        },
      }).then(async (count) => {
        if (count < 1) {
          return res.redirect("/dashboard/");
        } else {
          userAuth.deleteCount = count;

          try {
            const reservations = await Reservation.findAll({
              where: {
                username: {
                  [Op.eq]: userAuth.userDetails.username,
                },
              },
            });
            userAuth.reservations = reservations;
            res.render("dashboard", { userAuth });
          } catch (error) {
            console.error("Error fetching data:", error);
            res.render("dbError");
          }
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.render("dbError");
    }
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
