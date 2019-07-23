const app = require("express")();
const db = require("./config/db");
const consign = require("consign");

consign()
  .then("./config/middlewares.js")
  .into(app);

app.db = db;

app.listen(3000, (req, res) => {
  console.log("BACKEND RUNNING");
});
