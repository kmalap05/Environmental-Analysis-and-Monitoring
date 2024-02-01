const SensorData = require("../models/sensorDataModel");
const axios = require("axios");

const channelID = 2279831;
const fieldIDs = [1, 2, 3, 4, 5];
const interval = 15000;
let previousEntryId = null;

async function getLatestEntryCheckId() {
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
        `https://api.thingspeak.com/channels/${channelID}/fields/${fieldIDs[0]}/last.json`
      ),
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/fields/${fieldIDs[1]}/last.json`
      ),
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/fields/${fieldIDs[2]}/last.json`
      ),
      // axios.get(
      //   `https://api.thingspeak.com/channels/${channelID}/fields/${fieldIDs[3]}/last.json`
      // ),
      axios.get(
        `https://api.thingspeak.com/channels/${channelID}/fields/${fieldIDs[4]}/last.json`
      ),
    ]);

    const entry_check_id = await getLatestEntryCheckId();
    if (
      previousEntryId !== null &&
      responses[0].data.entry_id === previousEntryId
    ) {
      console.log(
        `Duplicate entry_id (${entry_check_id}). Skipping data insertion.`
      );
    } else {
      const data = {
        entry_id: entry_check_id,
        pH_value: parseFloat(responses[0].data.field1),
        tds_value: parseFloat(responses[1].data.field2),
        turbidity_value: parseFloat(responses[2].data.field3),
        // pm25_value: parseFloat(responses[3].data.field4),
        mq135_value: parseFloat(responses[4].data.field5),
      };

      await SensorData.create(data);
      previousEntryId = responses[0].data.entry_id; // Update previousEntryId with the current entry_id
    }
  } catch (error) {
    console.error(error);
  }
}

setInterval(() => {
  collectAndSaveData();
}, interval);

module.exports = collectAndSaveData;
