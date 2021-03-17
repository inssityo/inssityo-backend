const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

global.User = require("./api/models/userModel");
global.targetProfile = require("./api/models/targetProfileModel");
global.apartment = require("./api/models/apartmentModel");
global.landLord = require("./api/models/landLordModel");
const userRoutes = require("./api/routes/userRoutes");
const targetProfileRoutes = require("./api/routes/targetProfileRoutes");
const apartmentRoutes = require("./api/routes/apartmentRoutes");
const landLordRoutes = require("./api/routes/landLordRoutes");
const accessRoutes = require("./api/routes/accessRoutes");
const googleDriveAccess = require("./google-images/index.js");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose
  // eslint-disable-next-line no-undef
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

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
targetProfileRoutes(app);
apartmentRoutes(app);
landLordRoutes(app);
accessRoutes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);

googleDriveAccess.initializeGoogleAuth();
