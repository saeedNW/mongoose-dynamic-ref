/** import mongoose */
const {default: mongoose} = require("mongoose");
/** extract schema method from mongoose module */
const {Schema} = mongoose;

/** define course collection schema */
const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Course', courseSchema);
