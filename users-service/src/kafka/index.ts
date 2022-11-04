import { Kafka } from "kafkajs";

export const initKafkaProducer = () => {
    const kafka = new Kafka({
        clientId: 'chemo',
        brokers: ['kafka:9092']
    })

    const producer = kafka.producer();
    return producer
}