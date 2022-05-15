const express = require('express');
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');

require('dotenv').config();


const auth = require('./Middleware/auth')

const foodbankRoute = require('./routes/FoodBankRoute')
const userRoute = require('./routes/userRoute');
const donateRoute = require('./routes/donateRoute')
const requestRoute = require('./routes/requestRoute')
const profileRoute = require('./routes/profileRoute')
const upload = require('./Files/upload');

const morgan = require('morgan')

const bodyParser = require("body-parser");
const { verifyUser, verifyAdmin} = require('./Middleware/auth');
const app = express();

app.use(cors('*'))
app.use(morgan('tiny'))


mongoose.connect(process.env.DbURI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(()=> console.log('Database server connected'))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res) => {
    res.send('Welcome, to my app');
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRoute);
app.use('/api/DonateFood' , donateRoute);
app.use('/api/RequestFood', requestRoute);
app.use('/api/Profile', profileRoute);
app.use('/api/FoodBank', foodbankRoute);


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message
    })
})





app.listen(process.env.port, () => {
    console.log(`server is running at localhost:${process.env.port}`);
});