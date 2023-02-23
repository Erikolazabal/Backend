import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io"

/* conectar con mongo */
import './dao/dbConfig.js'

const app = express() 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

/* Routes */
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/', viewsRouter)


/*  seteo handlebars */
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')


/* Puerto 3000 */
const PORT = process.env.PORT || 3000

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    socket.emit('fetchMessages')
    socket.on('newMessage', ()=>{
        socket.emit('fetchMessages')
    })
})