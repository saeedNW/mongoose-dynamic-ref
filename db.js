/** import mongoose module */
const {default: mongoose} = require('mongoose');

exports.DBConnection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dynamic_ref");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}