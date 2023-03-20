import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import handlebars from 'express-handlebars'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'


/* conectar con mongo */
import './dao/dbConfig.js'

//Passport strategies functions
import './passport/passportStrategies.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongoUrl: "mongodb+srv://eriik_ol:AguanteLANUSS@cluster0.bckgf0w.mongodb.net/ecommerce?retryWrites=true&w=majority"
    })
}))
app.use(passport.initialize())
app.use(passport.session())

/* Routes */
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/users', usersRouter)
app.use('/', viewsRouter)

/*  seteo handlebars */
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

/* Puerto 3000 */
const PORT = process.env.PORT || 3000

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})


const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log(`Usuario conectado con el ID ${socket.id}`)
})