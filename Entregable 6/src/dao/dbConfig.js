import mongoose from 'mongoose'

const URI = "mongodb+srv://eriik_ol:AguanteLANUSS@cluster0.bckgf0w.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(URI)
.then(() => {
    console.log("Conectado con exito a la base de datos");
})
.catch((error) => {
    console.log(error)
})