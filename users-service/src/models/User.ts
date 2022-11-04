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
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
        default: 'USER',
    },
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    blockingUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    email: {
        type: String,
        required: true,
        match:   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        unique: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        default: 'PREFER_NOT_TO_SAY',
        enum: ['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY']
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