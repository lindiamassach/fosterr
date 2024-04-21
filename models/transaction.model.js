const mongoose = require('mongoose');
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipientName: String,
    routingNumber: Number,
    accountNumber: Number,
    amount: Number,
    // address: String,
    // city: String,
    // state: String,
    // zipCode: Number,
    memo: String,
    status: { type: String, default: "Pending" },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;