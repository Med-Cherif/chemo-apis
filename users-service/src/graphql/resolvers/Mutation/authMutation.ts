import { signupValidate } from "../../../validation/UserValidation"
import { UserInputError } from "apollo-server-express"
import { createUser, getUserByEmail, getUserByPreferedField, getUserByUsername } from "../../../services/UserServices"
import { createAccessToken, createRefreshToken } from "../../../helpers/createJWTokens"
import { comparePassword, hashPassword } from "../../../helpers/bcrypt"
import { Kafka, Partitioners } from "kafkajs"

export const signup = async (_: any, args: any, __: any) => {
            
    const { data } = args;

    if(!signupValidate(data)) {
        throw new UserInputError('Please provide valid informations');
    }

    const isEmailExists = await getUserByEmail(data.email);

    if (isEmailExists) {
        throw new UserInputError('Email already exists')
    }

    const isUsernameExists = await getUserByUsername(data.username)

    if (isUsernameExists) {
        throw new UserInputError('Username already exists')
    }
    
    const { confirmPassowrd, ...rest } = data;


    const user = await createUser({
        ...rest,
        password: hashPassword(rest.password)
    });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    const kafka = new Kafka({
        clientId: 'chemo',
        brokers: ['kafka:9092']
    })

    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner, allowAutoTopicCreation: true })
    await producer.connect()

    console.log('INIT Producer DONE------------- \n\n\n\n\n')
    
    await producer.send({
        topic: 'creatingNewUser',
        messages: [
            {
                value: JSON.stringify({
                    _id: user._id,
                    email: user.email
                }),

            }
        ]
    })

    console.log('SENDING DONE------------- \n\n\n\n\n')

    await producer.disconnect();

    return {
        accessToken,
        refreshToken,
        user
    }
}

export const signin = async (_: any, args: any, __: any) => {

    console.log(args)

    const { data } = args;

    const user = await getUserByPreferedField(data.field);

    if (!user) {
        throw new UserInputError('invalid credentials');
    }

    const isMatch = comparePassword(data.password, user.password);

    if (!isMatch) {
        throw new UserInputError('invalid credentials');
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    return {
        accessToken,
        refreshToken,
        user
    }
    
}