//general dependencies (to be installed)
const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');

//Services
const catFactService = require('./src/services/catFactService');
const dogFactService = require('./src/services/dogFactService');

//Login/Sign Up
const passport = require('passport'); //UserAuth Package, müssen alle installiert werden über npm install
const cookieParser = require('cookie-parser');
const session = require('express-session');
const factsRouter = require('./src/routers/factsRouter');
const authRouter = require('./src/routers/authRouter');


const PORT = 4000;  //Konstante für den Port der Wahl //process.env.PORT
const app = express();
app.set('views', './public/views');
app.set('view engine', 'ejs')

//für passport.js
app.use(morgan('tiny')); //app.use steht für Middleware
app.use(express.static(path.join(__dirname, '/public/'))); //schaut, ob das was in static geladen ist in public ist
app.use(express.json());//war bodyparser.json, sorgt dafür dass man mit .json in die datenbank schreiben kann (es in json umgewandelt wird)
app.use(express.urlencoded({extended:false})); //muss dazugeschrieben werden
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/facts', factsRouter);

// app.use('/facts', factsRouter);

//require('./src/config/passport.js')(app) //in passport.js wird eine Funktion gebaut, die app als Input verwednet

// app.get('/dogs', (req, res) => {
//     fetch('https://dog-api.kinduff.com/api/facts')
//         .then(response => response.json())
//         .then(data => {
//             var output = data.facts[Math.floor(Math.random() * data.facts.length)];
//             res.render('dogC', { output: output, backgroundColor:'darkred' });
//         })
//         .catch(error => console.error(error));
// });
app.get('/', (req,res)=>{
    res.render('index');
})


// app.get('/spotify', async (req, res) => {
//     const clientId = "26a37434a5fb47b9813adf5899ea8a9b";
//     const redirectUri = 'http://localhost:4000/spotify';
//     const code = req.query.code;
//     const verifier = generateCodeVerifier(128); // siehe function unten

//     if (!code) {
//         res.redirect(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`);
//     } else {
//         try {
//             const profile = await getSpotifyProfile(clientId, code, verifier, redirectUri);
//             debug(profile);
//             res.render('spotifyProfile', {profile});
//         } catch (err) {
//             console.error(err);
//             res.sendStatus(500);
//             debug(profile);
//         }
//     }
// });



// app.get('/auth', async (req, res) => {
//     const verifier = spotifyProfileService.generateCodeVerifier(128);
//     req.session.verifier = verifier;
//     const url = spotifyProfileService.generateRedirectUrl(verifier);
  
//     res.redirect(url);
// });

app.listen(PORT, ()=>{
    debug('Listening on Port ' + PORT);
});
