//general dependencies (to be installed)
const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

//Login/Sign Up
const passport = require('passport'); //UserAuth Package, müssen alle installiert werden über npm install
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = 4000;  //Konstante für den Port der Wahl //process.env.PORT
const app = express();
app.set('views', './public/views');
app.set('view engine', 'ejs')

//für passport.js
app.use(morgan('tiny')); //app.use steht für Middleware
app.use(static(join(__dirname, '/public/'))); //schaut, ob das was in static geladen ist in public ist
app.use(json());//war bodyparser.json, sorgt dafür dass man mit .json in die datenbank schreiben kann (es in json umgewandelt wird)
app.use(urlencoded({extended:false})); //muss dazugeschrieben werden
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(PORT, ()=>{
    debug('Listening on Port ' + PORT);
});