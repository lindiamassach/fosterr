const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    routingNumber: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    checkingAccount: {
        accountNumber: { type: String, unique: true },
        accountBalance: { type: String }
    }, 
    savingsAccount: {
        accountNumber: { type: String, unique: true },
        accountBalance: { type: String }
    },
    // acountHistory: [{
    //     date: { type: Date, default: Date.now },
    //     description: { type: String },
    //     amount: { type: String }
    // }],
    // errorMessage: { type: String }
}, { timestamps: true }
);

module.exports = mongoose.model('AccountInfo', infoSchema);