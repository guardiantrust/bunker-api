var Kafka = require('no-kafka');
var env = require('../../config/index');

module.exports = {
    Consumer: async function() {
        return new Kafka.SimpleConsumer({
            connectionString: env.kafka_url,
            idleTimeout: 250,
            asyncCompression: true,
            connectionTimeout: 5000,
            
        })
    }
}