require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sensorRoutes = require("./routes/sensorRoutes");
const connectToMongoDB = require("./config/dbConnect");
const collectAndSaveData = require("./utils/sensorDataCollector");

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB();
collectAndSaveData();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/sensor-data", sensorRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}👍`)
);
