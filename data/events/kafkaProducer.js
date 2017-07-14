var Kafka = require("kafka-node");
var env = require("../../config/index");
var HighLevelProducer = Kafka.HighLevelProducer;
var KeyedMessage = Kafka.KeyedMessage;
var Client = Kafka.Client;
var producer;
var connected;

producer.on("ready", function() {
  connected = true;
  console.log("Kafka Connected!");
});

module.exports = {
  Create: function(clientName) {
    var client = new Client(env.kafka_url, clientName, {
      sessionTimeout: 3000,
      retries: 3
    });

    producer = new HighLevelProducer(client);
  },
  Send: async function(topic, payload) {
    try {
      if (!connected) {
        throw new Error("Kafka not connected!");
      }
      await producer.Send([
        {
          topic: topic,
          message: payload,
          attributes: 1
        }
      ]);
    } catch (err) {
      console.log("kafkaProducer :" + err);
    }
  }
};
