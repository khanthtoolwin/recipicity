const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipes");
const mongoUrl = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ls0ymue.mongodb.net/?appName=Cluster0`;
const cors = require("cors");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to db...");
    app.listen(process.env.PORT, "localhost", () => {
      console.log(`app listening on port ${process.env.PORT}...`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ Hello: "Node JS" });
});

app.use("/api/recipes", recipeRoutes);
