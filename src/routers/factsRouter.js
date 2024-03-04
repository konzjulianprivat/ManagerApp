const express = require('express');
const debug = require('debug')('app:factsRouter');
//const sessions = require('../data/sessions.json');
// const {
//     MongoClient, //{MongoClient} zieht es direkt aus dem instalierten package.json
//     ObjectId, //zieht jetzt die Id als Objekt ObjectId aus der Datenbank heraus
// } = require('mongodb'); 

const catFactService = require('../services/catFactService');
const dogFactService = require('../services/dogFactService');

const factsRouter = express.Router();

factsRouter.get('/dogs', (req, res) => {
    dogFactService.getRandomFact()
        .then(output => {
            res.render('dogFacts', { output: output});
        })
        .catch(error => console.error(error));
});
factsRouter.get('/cats', (req, res) => {
    catFactService.getRandomFact()
        .then(output => {
            res.render('catFacts', { output: output});
        })
        .catch(error => console.error(error));
});


// const sessionsRouter = express.Router();
// sessionsRouter.use((req,res,next)=>{ //erstellt die MIddleware, braucht next, next -> sagt wann es done ist (done für middleware)
//     if(req.user){ //kann auch .admin hinzuadden -> prüft ob es ein admin ist oder nicht
//         next();
//     } else {
//         res.redirect('/auth/signIn');
//     }
// })

 module.exports = factsRouter;



