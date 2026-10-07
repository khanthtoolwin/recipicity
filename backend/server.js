const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();

const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${encodedPassword}@cluster0.ls0ymue.mongodb.net/?appName=Cluster0`;

// console.log("DB_USER:", process.env.DB_USER);
// console.log(
//   "DB_PASSWORD length:",
//   process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : "Undefined",
// );

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to db...");
    app.listen(process.env.PORT, "localhost", () => {
      console.log(`app listening on port ${process.env.PORT}...`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "Home directory of Recipicity backend server"});
});

app.use("/api/recipes", recipeRoutes);

app.use("/api/users", userRoutes);


