var Kafka = require('no-kafka');
var env = require('../../config/index');

module.exports = {
    Producer: async function() { 
        return await new Kafka.Producer({
            connectionString: env.kafka_url,
            asyncCompression: true,
            connectionTimeout: 5000,
            codec: Kafka.COMPRESSION_GZIP,
            requiredAcks: 1,
            retries: {
                attempts: 5,
                delay: {
                    min: 250,
                    max: 1000
                }
            }
        });
    }
}