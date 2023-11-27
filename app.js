const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const { auth } = require("express-openid-connect");
const bodyParser = require("body-parser");
const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/DBConnection").dbConnection;

const app = express();

// Added auth0 config
app.use(
  auth({
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.SESSION_SECRET,
    authRequired: false,
    auth0Logout: true,
  })
);

app.use(cookieParser());

const {
  invalidCsrfTokenError,
  generateToken,
  validateRequest,
  doubleCsrfProtection,
} = doubleCsrf({
  getSecret: () => {
    return "bb12baa3960384a3b50f06be53da9f6d5abcdf856bf4605f8dab";
  },
  getTokenFromRequest: (req) => {
    return req.body._csrf;
  },
  cookieName: "doubleCrsf",
  cookieOptions: {
    sameSite: "lax",
    path: "/",
    secure: false,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(doubleCsrfProtection);

app.get("/csrf-token", (req, res) => {
  if (req.csrfToken === undefined) {
    return res.status(500).json({ error: "CSRF Token not found" });
  }
  console.log({ csrfToken: req.csrfToken() });
  res.json({ csrfToken: req.csrfToken() });
});

// Added static folder for static stuff
app.use("/static", express.static(path.join(__dirname, "static")));

// Set up EJS for views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./routes/index"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/reserve", require("./routes/reserve"));

app.use("/delete", require("./routes/deleteID"));

app.use((req, res) => {
  res.status(404).render("404");
});

const dbConnectionError = () => {
  const errApp = express();
  errApp.use("/static", express.static(path.join(__dirname, "static")));

  errApp.set("view engine", "ejs");
  errApp.set("views", path.join(__dirname, "views"));

  errApp.use((req, res) => {
    res.render("dbError");
  });
  const errManager = errApp.listen(process.env.PORT, () => {
    console.log(`Server Fired up on http://localhost:${process.env.PORT}`);
  });

  setTimeout(() => {
    errManager.close();
    startServer();
  }, process.env.SERVER_RESTART_TIMEOUT);
};

const startServer = async () => {
  dbConnection
    .sync()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Server Fired up on http://localhost:${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting to databse ", err);
      dbConnectionError();
    });
};

startServer();
