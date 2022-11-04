import { KafkaMessage } from "kafkajs";

export const handleMessage = (message: KafkaMessage) => {
    let { value, offset } = message;
    let msg;
    if (value) {
        msg = JSON.parse(value.toString())
    }

    return {
        value: msg,
        offset,
    }
}