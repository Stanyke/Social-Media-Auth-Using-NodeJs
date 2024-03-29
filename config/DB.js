const mongoose = require('mongoose');

const db = "mongodb+srv://"+process.env.MONGOOSE_USER+":"+process.env.MONGOOSE_PASSWORD+"@cluster0.g9vxj.mongodb.net/social-media-auth-test?retryWrites=true&w=majority";

const runDB = mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`MongodDB's mongoose is connected`)
}).catch((err) => {
    console.log(`MongodDB's mongoose failed to connect`)
})

module.exports = runDB;