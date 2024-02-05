const SensorData = require("../models/sensorDataModel");
const errorMiddleware = require("../middlwares/errorMiddleware");

const getAllEntriesHandler = async (req, res) => {
  const entries = await SensorData.find();
  res.json(entries);
};

const getEntriesByValueHandler = (valueField) => async (req, res) => {
  const entries = await SensorData.find(
    {},
    { _id: 0, entry_id: 1, [valueField]: 1 }
  );
  res.json(entries);
};

const getLastEntryOfValueHandler = (valueField) => async (req, res) => {
  const entry = await SensorData.findOne(
    {},
    { _id: 0, entry_id: 1, [valueField]: 1 }
  ).sort({ createdAt: -1 });
  res.json(entry);
};

const storeSensorDataHandler = async (req, res) => {
  const dataFromNodeMCU = req.body;
  console.log(dataFromNodeMCU);
  res.json(dataFromNodeMCU);
};

const getAllEntries = errorMiddleware(getAllEntriesHandler);
const getEntriesByPHValue = errorMiddleware(
  getEntriesByValueHandler("pH_value")
);
const getEntriesByTDSValue = errorMiddleware(
  getEntriesByValueHandler("tds_value")
);
const getEntriesByTurbidityValue = errorMiddleware(
  getEntriesByValueHandler("turbidity_value")
);
const getEntriesByPM25Value = errorMiddleware(
  getEntriesByValueHandler("pm25_value")
);
const getEntriesByMQ135Value = errorMiddleware(
  getEntriesByValueHandler("mq135_value")
);
const getLastEntryOfPHValue = errorMiddleware(
  getLastEntryOfValueHandler("pH_value")
);
const getLastEntryOfTDSValue = errorMiddleware(
  getLastEntryOfValueHandler("tds_value")
);
const getLastEntryOfTurbidityValue = errorMiddleware(
  getLastEntryOfValueHandler("turbidity_value")
);
const getLastEntryOfPM25Value = errorMiddleware(
  getLastEntryOfValueHandler("pm25_value")
);
const getLastEntryOfMQ135Value = errorMiddleware(
  getLastEntryOfValueHandler("mq135_value")
);
const storeSensorData = errorMiddleware(storeSensorDataHandler);

module.exports = {
  getAllEntries,
  getEntriesByPHValue,
  getEntriesByTDSValue,
  getEntriesByTurbidityValue,
  getEntriesByPM25Value,
  getEntriesByMQ135Value,
  getLastEntryOfPHValue,
  getLastEntryOfTDSValue,
  getLastEntryOfTurbidityValue,
  getLastEntryOfPM25Value,
  getLastEntryOfMQ135Value,
  storeSensorData,
};
