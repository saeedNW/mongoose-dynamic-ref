/** import mongoose */
const {default: mongoose} = require("mongoose");
/** extract schema method from mongoose module */
const {Schema} = mongoose;

/** define user collection schema */
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bought: [{
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "docModel",
    }],
    docModel: [{
        type: String,
        enum: ['Product', 'Course'],
        required: true
    }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
