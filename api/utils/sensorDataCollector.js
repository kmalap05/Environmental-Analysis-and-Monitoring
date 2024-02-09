const SensorData = require("../models/sensorDataModel");
const axios = require("axios");

const channelID = 2279831;
const interval = 15000;
let previousApiEntryID = null;

async function getLatestEntryId() {
  const latestEntry = await SensorData.findOne(
    {},
    {},
    { sort: { entry_id: -1 } }
  );
  return latestEntry ? latestEntry.entry_id + 1 : 0;
}
async function collectAndSaveData() {
  try {
    const responses = await Promise.all([
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/feeds/last.json`
      ),
    ]);

    let currentApiEntryID = responses[0].entry_id;

    if (currentApiEntryID !== previousApiEntryID) {
      const entry_id = await getLatestEntryId();
      const data = {
        entry_id,
        pH_value: parseFloat(responses[0].data.field1),
        tds_value: parseFloat(responses[0].data.field2),
        turbidity_value: parseFloat(responses[0].data.field3),
        pm25_value: parseFloat(responses[0].data.field4),
        mq135_value: parseFloat(responses[0].data.field5),
      };

      await SensorData.create(data);
      previousApiEntryID = currentApiEntryID;
    }
  } catch (error) {
    console.error(error);
  }
}

setInterval(() => {
  collectAndSaveData();
}, interval);

module.exports = collectAndSaveData;
