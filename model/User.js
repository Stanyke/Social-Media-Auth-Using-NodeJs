const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    oauth: {
        provider: { type: String, enum: ['google', 'facebook'] },
        oauthID: { type: String }
    }
}, { timestamps: true});

const User = module.exports = mongoose.model('User', UserSchema)