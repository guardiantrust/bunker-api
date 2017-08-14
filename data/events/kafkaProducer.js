var Kafka = require("kafka-node");
var env = require("../../config/index");
var HighLevelProducer = Kafka.HighLevelProducer;
var KeyedMessage = Kafka.KeyedMessage;
var Client = Kafka.Client;
var producer;
var connected;

module.exports = {
    Create: function(clientName) {
        var client = new Client(env.kafka_url, clientName, {
            sessionTimeout: 3000,
            retries: 3
        });

        producer = new HighLevelProducer(client);
        producer.on("ready", function() {
            connected = true;
            console.log("Kafka Connected!");
        });
        producer.on('error', function(err) {
            console.log('kafkaProducer :', err);
        });
    },
    Send: async function(topic, message) {
        try {
            if (!connected) {
                throw new Error("Kafka not connected!");
            }
            var payload = [{
                topic: topic,
                messages: message,
                attributes: 1
            }];
            producer.send(payload, function(error, result) {
            });

        } catch (err) {
            console.log("kafkaProducer :" + err);
        }
    }
};