const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, ROUTING_NUMBER, ACCT_FIRST_6 } = process.env;

const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const AccountInfo = require('../models/accountInfo.model');
const handleError = require('../helpers/validationError');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: maxAge })
}


const newAccountNumber = (FIRST_6) => {
    const LAST_4 = Math.floor(Math.random() * 9999);
    const FULL = `${FIRST_6}${LAST_4}`;
    return FULL;
}



module.exports.register = async (req, res) => {
    const { firstName, lastName, address, email, savingsBal, checkingBal, phoneNo, password } = req.body;

    const userInfo = {
        firstName,
        lastName,
        email,
        phoneNo,
        address,
        password
    }

    const user = new User(userInfo);

    const newACC = {
        routingNumber: ROUTING_NUMBER,
        checkingAccount: {
            accountNumber: newAccountNumber(ACCT_FIRST_6),
            accountBalance: checkingBal
        },
        savingsAccount: {
            accountNumber: newAccountNumber(ACCT_FIRST_6),
            accountBalance: savingsBal
        }
    }

    const newAccount = new AccountInfo({ ...newACC, user: user._id, });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        await user.save();
        await newAccount.save();

        res.render('login', { title: "LOGIN", message: "User Created. Please login" });
    } catch (error) {
        handleError('signup', { 'DB_ERR': error.message }, res);
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Account not found. Please Sign up.');

        const { password: dbPassword } = user.toObject();

        const validPassword = await bcrypt.compare(password, dbPassword);
        if (!validPassword) throw new Error("Invalid password");

        const token = createToken({ id: user._id, email: email });
        res.cookie('ucbi_token', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        handleError('login', { 'DB_ERR': error.message }, res);
    }
};
