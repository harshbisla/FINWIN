const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../src/models/users');

const validatePassword = (email, password) => {
    const user = User.fineOne({email: email})
    if(user.password == password) {
        return true;
    }
    return false;
}

const verifyCallback = (req, email, password, done) => {
    User.fineOne({email: email})
        .then((user) => {
            if(!user) {
                return done(null, false, {message: false})
            }
    const isValid = validatePassword(req.body.email, req.body.password);
    if (isValid) {
        return done(null, user, {message: true})
    } else {
        return done(null, false, {message: false});
    }
}).catch((err) => {
    console.log(`authorization error: ${err}`)};
    done(err);
});
}

const strategy = new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true}, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, {id: user.id, role: user.role});
}
passport.deserializeUser((user, done) => {
    User.findById(user.id).then((user) => {
        done(null, user);
    })
        .catch(err => {console.log(`deserialize err ${err}`);
            done(err)})
})
});


