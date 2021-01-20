const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

global.User = require("./api/models/userModel");
global.targetProfile = require("./api/models/targetProfileModel");
global.apartment = require("./api/models/apartmentModel");
const userRoutes = require("./api/routes/userRoutes");
const targetProfileRoutes = require("./api/routes/targetProfileRoutes");
const apartmentRoutes = require("./api/routes/apartmentRoutes");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
targetProfileRoutes(app);
apartmentRoutes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
