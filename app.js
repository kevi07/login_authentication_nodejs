const express = require('express');
const mongoose = require('mongoose');
const path =  require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRouter');
const {requireAuth , checkUser } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

const dbURI ="mongodb+srv://Kevin:Kevin123@login.yhw3wb7.mongodb.net/?retryWrites=true&w=majority&appName=login"
mongoose.connect(dbURI,{useNewUrlParser : true , useUnifiedTopology: true})
    .then((result) => {
        console.log("db connected successfully")
    })
    .catch((err) => {
        console.log(err);
    })


app.get('*',checkUser);
app.get('/',(req,res) => res.render('home'));
app.get('/smoothies', requireAuth,(req,res) => { res.render('smoothies')});


app.use(authRoutes);
app.listen(2000);