import { Kafka } from "kafkajs";
import nodemailer from "nodemailer"
import { handleMessage } from "./handleMessage";

const kafka = new Kafka({
  clientId: 'chemo',  
  brokers: ['kafka:9092']
})


const consumer = kafka.consumer({ groupId: 'send-mail' })

const run = async () => {
  
  await consumer.connect()
  await consumer.subscribe({ topic: 'creatingNewUser', fromBeginning: true })
  console.log('CONSUMER subscribed')

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { value } = handleMessage(message);
      if (!value) return;

      if (topic === 'creatingNewUser') {
        sendMail({
          subject: 'Confirming your email address',
          email: value.email,
          html: `
            <a href="http://localhost:3000/token">Click here to confirm your email address</a>
          `
        })
      }

    },
  })
}


run().catch(console.error)




const sendMail = async ({
    email, subject, html, text
}: {
  email: string
  subject: string
  html?: string
  text?: string
}) => {
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILING_SERVICE_EMAIL,
            pass: process.env.EMAILING_SERVICE_PASS
        }
    })

    try {
        await transporter.sendMail({
            
            from: process.env.EMAILING_SERVICE_EMAIL,
            to: email,
            subject,
            html,
            text
        })
        console.log('Email sent successfully to', email)
    } catch (error) {
        console.log(error);
    }

}

// sendMail();