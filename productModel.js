/** import mongoose */
const {default: mongoose} = require("mongoose");
/** extract schema method from mongoose module */
const {Schema} = mongoose;

/** define product collection schema */
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
