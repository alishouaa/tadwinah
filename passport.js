/**
 * User Model
 */
const User = require('./models/user');

/**
 * Passport
 */
const passport = require('passport');

/**
 * Passport JWT
 */
const passportJWT = require("passport-jwt");

/**
 * JWT Passport ExtractJwt
 */
const ExtractJWT = passportJWT.ExtractJwt;

/**
 * JWT Passport Strategy
 */
const JWTStrategy   = passportJWT.Strategy;

/**
 * Passport Strategy
 */
const LocalStrategy = require('passport-local').Strategy;
 
/**
 * Create Local Strategy
 */
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    function (email, password, cb) {
        return User.findOne({email, password}).then(user => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect email or password.'});
            }
            return cb(null, user, {message: 'Logged In Successfully'});
        })
        .catch(err => cb(err));
    }
));

/**
 * Create JWT Strategy
 */
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
},
function (jwtPayload, cb) {
    //find the user in db if needed
    return User.findById(jwtPayload.id, 'name email')
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));
