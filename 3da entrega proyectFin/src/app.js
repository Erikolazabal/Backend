import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { __dirname } from './utils.js'
import envConfig from './config/envConfig.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import cartsRouter from './routes/carts.router.js'
import usersRouter from './routes/users.router.js'
import sessionRouter from './routes/sessions.router.js'
import mailingRouter from './routes/mailing.router.js'

//Connect to mongo
import './config/dbConfig.js'

//Passport strategies functions
import './passport/passportStrategies.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(session({
    store: new mongoStore({
        mongoUrl: envConfig.mongoUri
    }),
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: false,
    Cookie: {
        maxAge: 600000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

/* Routes */
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionRouter)
app.use('/users', usersRouter)
app.use('/mail', mailingRouter)
app.use('/', viewsRouter)

/*  seteo handlebars */
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

/* Puerto 3000 */
const PORT = envConfig.port || 3000

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log(`Usuario conectado con el ID ${socket.id}`)
})