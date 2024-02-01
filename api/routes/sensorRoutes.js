const express = require("express");
const router = express.Router();
const sensorDataController = require("../controllers/sensorDataController");

router.get("/entries", sensorDataController.getAllEntries);

router.get("/entries/ph", sensorDataController.getEntriesByPHValue);

router.get("/entries/tds", sensorDataController.getEntriesByTDSValue);

router.get(
  "/entries/turbidity",
  sensorDataController.getEntriesByTurbidityValue
);

router.get("/entries/pm25", sensorDataController.getEntriesByPM25Value);

router.get("/entries/mq135", sensorDataController.getEntriesByMQ135Value);

router.get("/entries/ph/last", sensorDataController.getLastEntryOfPHValue);

router.get("/entries/tds/last", sensorDataController.getLastEntryOfTDSValue);

router.get(
  "/entries/turbidity/last",
  sensorDataController.getLastEntryOfTurbidityValue
);

router.get("/entries/pm25/last", sensorDataController.getLastEntryOfPM25Value);

router.get(
  "/entries/mq135/last",
  sensorDataController.getLastEntryOfMQ135Value
);

module.exports = router;
