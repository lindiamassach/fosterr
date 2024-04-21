const User = require('../models/user.model');
const Payment = require('../models/transaction.model');
const AccountInfo = require('../models/accountInfo.model');

module.exports.fetchDashboardData = async (userId) => {
    try {
        const user = await User.findById(userId, 'firstName lastName');
        if (!user) throw new Error('User not found');

        const accountInfo = await AccountInfo.findOne({ user: user._id });
        if (!accountInfo) console.log('No account matching the user');

        const paymentHistory = await Payment.find({ user: user._id }, 'createdAt amount status memo');

        const history = paymentHistory.map(payment => {
            payment = payment.toObject();
            const dbDate = new Date(payment.createdAt);
            const formattedDate = `${dbDate.getMonth() + 1}-${dbDate.getDate()}-${dbDate.getFullYear()}`;
            payment.createdAt = formattedDate;
            return payment;
        })

        return { title: 'Account Summary', firstName: user.firstName, lastName: user.lastName, accountInfo, history };

    } catch (error) {
        if (error.message === "User not found") res.redirect('/login');
    }
}

module.exports.fetchImage = async (userId) => {
    try {
        const user = await User.findById(userId, 'image');
        if (!user) throw new Error('User not found');

        return { image: user.image };

    } catch (error) {
        if (error.message === "User not found") res.redirect('/login');
    }
}

module.exports.fetchUserName = async (userId) => {
    try {
        const user = await User.findById(userId, 'firstName lastName');
        if (!user) throw new Error('User not found');

        return { firstName: user.firstName, lastName: user.lastName };

    } catch (error) {
        if (error.message === "User not found") res.redirect('/login');
    }
}