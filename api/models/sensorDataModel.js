const mongoose = require("mongoose");

const sensorDataModel = new mongoose.Schema(
  {
    entry_id: {
      type: Number,
      required: true,
    },
    pH_value: {
      type: Number,
      required: true,
    },
    tds_value: {
      type: Number,
      required: true,
    },
    turbidity_value: {
      type: Number,
      required: true,
    },
    pm25_value: {
      type: Number,
      required: true,
    },
    mq135_value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SensorData = mongoose.model("SensorData", sensorDataModel);

module.exports = SensorData;
