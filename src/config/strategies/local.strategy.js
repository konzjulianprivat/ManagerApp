const passport = require('passport');
const {Strategy} = require ('passport-local');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:localStrategy');

module.exports = function localStrategy(){ //das führt er beim Aufruf einmal aus und gibt es nachher aus
    passport.use(new Strategy({ //erstellt hiermit eine neue Strategy die lokal läuft
        usernameField: 'username', //gibt den Namen des Feldes im EJS Dokument an (Index.ejs)
        passwordField: 'password'
    }, (username, password, done)=>{
        const url = 
        'mongodb+srv://konzju:Geheim00@globomantics.yjrs9ji.mongodb.net/?retryWrites=true&w=majority'; //url der DB
        const dbName = 'globomantics';
        // const user = {username, password, 'name': 'Julian'} //können weitere Parameter zugewiesen werden
        // done(null, user); //returned den User ohne Felermeldung

        (async function validateUser(){
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to MongoDB');

                const db = client.db(dbName);

                const user = await db.collection('users').findOne({username});
                if(user && user.password === password){
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
            client.close();
        }())
    }));
};