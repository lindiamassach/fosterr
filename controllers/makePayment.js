const Payment = require('../models/transaction.model');

const makePayment = async (req, res) => {
    const userId = req.userId;
    const data = req.body;
    try {
        const payment = new Payment({ ...data, user: userId });
        await payment.save();
        res.render('transfer', { title: 'Transfers & Bill Payment', message: "Your transaction is pending, please contact support immediately for the neccessary assistance..." });
    } catch (error) {
        console.log(error);
    }
}

module.exports = makePayment;