const app = require("express")();

app.get("/", (req, res) => {
  res.status(200).send("nheee");
});

app.listen(3000, (req, res) => {
  console.log("BACKEND RUNNING");
});
