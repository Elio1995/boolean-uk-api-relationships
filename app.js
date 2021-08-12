var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();

const doctorsRouter = require("./src/resources/doctors/router");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/doctors", doctorsRouter);

app.all("*", (req, res) => {
  res.status(404).json({ msg: "You are wrong" });
});

module.exports = app;
