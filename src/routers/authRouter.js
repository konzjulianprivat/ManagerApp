const express = require('express');
const debug = require('debug')('app:authRouter');
//const sessions = require('../data/sessions.json');
const {
    MongoClient, //{MongoClient} zieht es direkt aus dem instalierten package.json
    ObjectId, //zieht jetzt die Id als Objekt ObjectId aus der Datenbank heraus
} = require('mongodb'); 
const passport = require('passport');

 const authRouter = express.Router();
 module.exports = authRouter;

 authRouter.route('/signUp').post((req,res)=>{
    //User SignUp
    const {username, password} = req.body; //speichert das was im body steht (username, password) zwischen
    const url = 
        'mongodb+srv://konzju:Geheim00@globomantics.yjrs9ji.mongodb.net/?retryWrites=true&w=majority'; //url der DB
    const dbName = 'globomantics';

    (async function addUser(){
        let client;
        try{
            client = await MongoClient.connect(url);

            const db = client.db(dbName);
            const user = { username, password }; //erstellt den User als Array,der ein Feld username und password enthält
            const results = await db.collection('users').insertOne(user); //man muss hier das await einbauen, weil sonst ist das promise appending
            debug(results);
            req.login(results, ()=>{
                res.redirect('/auth/profile');
            });
        } catch (error){
            debug(error);
        }
        client.close();
    }())

    // der Teil kümmert sich um den Login und die Weiterleitung an die profilePage mit den Daten drauf
    res.json(req.body); //returned den Body des im Call aufgerufenen Bodyteils im EJS Code
    req.login(req.body, ()=>{
        res.redirect('/auth/profile');
    });
 });
 authRouter
    .route('/profile')
    .get((req,res)=>{
        res.json(req.user); //ein User wird durch req.login erstellt mit den parametern die in local.strategies abgefragt wurden
    });
 authRouter
    .route('/login')
    .get((req, res)=> {
        res.render('login'); //rendert erst die sign in seite, mach dann danach einen post
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
        failureMessage: 'Carbonat Erol'
    }))