"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const sendMail = () => __awaiter(void 0, void 0, void 0, function* () {
    const kafka = new kafkajs_1.Kafka({
        clientId: 'chemo',
        brokers: ['localhost:9092'],
    });
    const consumer = kafka.consumer({ groupId: 'group-1', allowAutoTopicCreation: true });
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'creating-new-user', fromBeginning: true });
    console.log('\n\n\n\n CONNECTED \n\n\n\n\n');
    yield consumer.run({
        eachMessage: ({ message, partition, topic }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`\n\n\n\n\n A message: ${message.value} from topic ${topic} from partiion ${partition} \n\n\n\n\n`);
        }),
    });
    // const email = 'cherifmohamedi554@gmail.com';
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAILING_SERVICE_EMAIL,
    //         pass: process.env.EMAILING_SERVICE_PASS
    //     }
    // })
    // try {
    //     await transporter.sendMail({
    //         from: process.env.EMAILING_SERVICE_EMAIL,
    //         to: email,
    //         subject: 'Welcome to chemo app, Please confirm your email',
    //         html: `
    //             <a href="http://localhost:3000">Click here to confirm your email address</a>
    //         `
    //     })
    //     console.log('Email sent successfully')
    // } catch (error) {
    //     console.log(error);
    // }
});
sendMail();
