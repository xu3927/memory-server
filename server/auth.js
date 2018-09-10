import passport from 'koa-passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import DAO from '../dao/index'

const LocalStrategy = passportLocal.Strategy;
const {getMember} = DAO.member

const options = {};

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
    return getMember({id})
    .then(res => {
        let user = res[0]
        done(null, user)
    })
    .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy(options, (user_name, password, done) => {
    getMember({user_name})
    .then((user) => {
        if (!user) return done(null, false);
        if (!comparePass(password, user.password)) {
        return done(null, false);
        } else {
        return done(null, user);
        }
    })
    .catch((err) => { return done(err); });
}));