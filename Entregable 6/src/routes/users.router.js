import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/services/mongoManagers/UserManager.js";

const router = Router()
const userManager = new UserManager()

//Debería ser una variable de entorno, esto es solo para probar
const admin = {
    email: "adminCoder@coder.com",
    password: "adminCod3r123"
}

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/registerError',
    successRedirect: '/',
    passReqToCallback: true,
}))

router.post('/login', passport.authenticate('login',{
    failureRedirect: '/loginError',
    successRedirect: '/',
    passReqToCallback: true,
}))

router.get('/github/auth', passport.authenticate('githubAuth', {scope: [ 'user:email' ] }))
router.get('/github/callback', passport.authenticate('githubAuth'),(req,res) => {
    req.session.user = req.user
    res.redirect('/products')
})

router.get('/logout', async (req,res) => {
    req.session.destroy(error => {
        if(error){
            console.log(error);
        } else {
            res.redirect('/')
        }
    })
})

export default router