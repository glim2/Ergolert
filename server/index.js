const express = require("express");
const path = require("path");
const volleyball = require('volleyball');

const app = express();

const debug = process.env.JWT === 'jwt'
app.use(volleyball.custom({ debug }))

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// static middleware
app.use(express.static(path.join(__dirname, "../public")));

// include our routes!
app.use("/api", require("./api"));

// Send index.html for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
