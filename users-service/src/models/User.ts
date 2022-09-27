import { Schema, model } from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        match: /^[a-z0-9_\.]+$/,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match:   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        unique: true
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE']
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

schema.index({ name: 1, username: 1 });

const UserModel = model('User', schema, 'users');

export default UserModel;