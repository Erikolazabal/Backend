import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2'
import { userModel } from '../dao/MongoDao/models/user.model.js';
import { cartModel } from '../dao/MongoDao/models/carts.model.js';
import { hasher, hasherCompare } from '../utils.js';
import GithubUserDTO from '../dto/UsersDTO/githubUser.dto.js';
import NewCartDTO from '../dto/CartsDTO/newCart.dto.js';

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) =>{
    try {
        const user = await userModel.findOne({email: email})
        const {first_name, last_name, age} = req.body
        if (!first_name || !last_name || !age || !email || !password) {
            return done(null, false)
        }
        if(user){
            return done(null, false)
        }
        const hashedPassword = await hasher(password)
        const userCart = await cartModel.create({products: []})
        const newUserData = {...req.body, password: hashedPassword, cart: userCart._id}
        const newUser = await userModel.create(newUserData)
        done(null, newUser)
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},  async (req, email, password, done) => {
        try {
            const userExist = await userModel.findOne({email: email})
            if(!userExist){
                done(null, false)
            } else {
                console.log(userExist);
                const passwordMatch = await hasherCompare(password, userExist.password)
                if (!passwordMatch) return done(null, false)
                done(null, userExist)
            }
        } catch (error) {
            done(error)
        }
    }
))

passport.use('githubAuth', new GithubStrategy({
    clientID: "Iv1.662f3b6aa9433d23",
    clientSecret: "df434f8eaccd4e86201032e54016271a536dc506",
    callbackURL: 'http://localhost:3000/users/github/callback',
}, async (accessToken, refreshToken, profile, done) =>{
    const {name, email} = profile._json
    const user = await userModel.findOne({email: email})
    if(!user){
        const cart = new NewCartDTO()
        const userCart = await cartModel.create(cart)
        const userData = new GithubUserDTO({name, email}, userCart)
        const newUser = await userModel.create(userData)
        done(null, newUser)
    } else {
        done(null, user)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({_id: id})
    done(null, user)
})