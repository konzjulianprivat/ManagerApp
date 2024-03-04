const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    //serializsation -> User in ein Format bauen, dass die Daten speichern kann
    passport.serializeUser((user,done)=>{
        done(null, user);
    });
    passport.deserializeUser((user, done)=>{
        done(null, user);
        
    });
}