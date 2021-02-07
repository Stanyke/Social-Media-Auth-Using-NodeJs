const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const User = module.exports = mongoose.model('User', UserSchema)