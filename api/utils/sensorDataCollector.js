const SensorData = require("../models/sensorDataModel");
const axios = require("axios");

const channelID = 2279831;
const fieldIDs = [1, 2, 3, 4, 5];
const interval = 15000;

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
        `https://api.thingspeak.com/channels/${channelID}/fields/1/last.json`
      ),
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/fields/2/last.json`
      ),
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/fields/3/last.json`
      ),
      // axios.get(
      //   `https://api.thingspeak.com/channels/${channelID}/fields/${fieldIDs[3]}/last.json`
      // ),
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/fields/5/last.json`
      ),
    ]);

    const entry_id = await getLatestEntryId();
    const data = {
      entry_id,
      pH_value: parseFloat(responses[0].data.field1),
      tds_value: parseFloat(responses[1].data.field2),
      turbidity_value: parseFloat(responses[2].data.field3),
      // pm25_value: parseFloat(responses[3].data.field4),
      mq135_value: parseFloat(responses[3].data.field5),
    };

    await SensorData.create(data);
  } catch (error) {
    console.error(error);
  }
}

setInterval(() => {
  collectAndSaveData();
}, interval);

module.exports = collectAndSaveData;
