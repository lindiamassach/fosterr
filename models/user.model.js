const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: { type: String },
    savingsBal: { type: String },
    checkingBal: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    image: { type: String }
}, { timestamps: true }
);

userSchema.post('save', function (err, doc, next) {
    if (err && err.code === 11000) {
        next(new Error('An account already exists with that email'))
    } else {
        next();
    };
})

module.exports = mongoose.model('User', userSchema);