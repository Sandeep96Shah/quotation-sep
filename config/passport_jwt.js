const User = require("../model/user");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'GC4QVRWtXn',
}

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        const user = await User.findOne({email: jwt_payload.email});
        if (user) {

            return done(null, user);

        } else {

            return done(null, false);
            // or you could create a new account

        }
    }catch(error){
        return done(error, false);
    }
}));