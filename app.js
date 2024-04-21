require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT } = process.env;

const connectDB = require('./models/db');
const homeRoute = require('./routes/homeRoute');
const signupRoute = require('./routes/signupRoute');
const signoutRoute = require('./routes/signoutRoute');
const loginRoute = require('./routes/loginRoute');
const paymentRoute = require('./routes/paymentRoute');
const profileRoute = require('./routes/profileRoute');

const app = express();

// SET VIEW EJS ENGINE
app.set('view engine', 'ejs');

connectDB(() => {
    // MIDDLEWARES & STATIC FILES 
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(cookieParser());

    // Route Handlers
    app.use('/', homeRoute);
    app.use('/payment', paymentRoute);
    app.use('/profile', profileRoute);
    app.get('/credit-cards', (req, res) => {
        res.render('cc');
    });
    app.use('/signup', signupRoute);
    app.use('/login', loginRoute);
    app.use('/signout', signoutRoute);

    app.use((error, req, res, next) => {
        if (error) console.log(error);
    })

    // start server listening
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
