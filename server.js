const express = require("express");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const mongodb = require("./database/mongo");
const Application = express();
const PORT = 3000;

const contactRoute = require("./api/routes/contact");
const userRoute = require("./api/routes/user");

Application.use(morgan("dev"));
Application.use(bodyParser.urlencoded({ extended: true }));
Application.use(bodyParser.json());

Application.use("/api/contacts", contactRoute);
Application.use("/api/users", userRoute);
Application.get("/", (req, res) => {
  res.send("<h3>Hello World</h3>");
});

Application.listen(PORT, () =>
  console.log("EXPRESS SERVER START SUCCESSFULLY")
);
