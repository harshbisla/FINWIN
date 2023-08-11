const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../src/models/users');

const verifyCallback = (req, email, password, done) => {
    let isValid = false;
    // console.log(email, password);
    User.findOne({ email: email }).exec()
        .then(user => {
            if (user) {
                if (user.password == password) {
                    console.log('valid ');
                    return done(null, user, {message: true})
                } else {
                    console.log(' not valid');
                    return done(null, false, {message: false});
                }
            } else {
                console.log('verifycallback !user');
                return done(null, false, {message: false})
            }
        })
        .catch(error => {
            console.error('Error:', error);

        });
}

const strategy = new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true}, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    try {
        console.log(user.id);
        done(null, user.id);
    } catch (e)
    {
        console.log(`serialize error ${e}`)
    }

})

passport.deserializeUser((id, done) => {
    console.log(`deserializing ${id}`);
    User.findById(id).then((foundUser) => { // Use a different parameter name here
        done(null, foundUser);
    }).catch(err => {
        console.log(`deserialize err ${err}`);
        done(err);
    });
});


//
