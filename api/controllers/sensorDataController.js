const SensorData = require("../models/sensorDataModel");

const getAllEntries = async (req, res) => {
  try {
    const entries = await SensorData.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEntriesByPHValue = async (req, res) => {
  try {
    const entries = await SensorData.find(
      {},
      { _id: 0, entry_id: 1, pH_value: 1 }
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEntriesByTDSValue = async (req, res) => {
  try {
    const entries = await SensorData.find(
      {},
      { _id: 0, entry_id: 1, tds_value: 1 }
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEntriesByTurbidityValue = async (req, res) => {
  try {
    const entries = await SensorData.find(
      {},
      { _id: 0, entry_id: 1, turbidity_value: 1 }
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEntriesByPM25Value = async (req, res) => {
  try {
    const entries = await SensorData.find(
      {},
      { _id: 0, entry_id: 1, pm25_value: 1 }
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEntriesByMQ135Value = async (req, res) => {
  try {
    const entries = await SensorData.find(
      {},
      { _id: 0, entry_id: 1, mq135_value: 1 }
    );
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastEntryOfPHValue = async (req, res) => {
  try {
    const entry = await SensorData.findOne(
      {},
      { _id: 0, entry_id: 1, pH_value: 1 }
    ).sort({ createdAt: -1 });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastEntryOfTDSValue = async (req, res) => {
  try {
    const entry = await SensorData.findOne(
      {},
      { _id: 0, entry_id: 1, tds_value: 1 }
    ).sort({ createdAt: -1 });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastEntryOfTurbidityValue = async (req, res) => {
  try {
    const entry = await SensorData.findOne(
      {},
      { _id: 0, entry_id: 1, turbidity_value: 1 }
    ).sort({ createdAt: -1 });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastEntryOfPM25Value = async (req, res) => {
  try {
    const entry = await SensorData.findOne(
      {},
      { _id: 0, entry_id: 1, pm25_value: 1 }
    ).sort({ createdAt: -1 });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastEntryOfMQ135Value = async (req, res) => {
  try {
    const entry = await SensorData.findOne(
      {},
      { _id: 0, entry_id: 1, mq135_value: 1 }
    ).sort({ createdAt: -1 });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
};
