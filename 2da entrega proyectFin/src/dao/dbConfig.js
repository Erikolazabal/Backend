import mongoose from 'mongoose'

const URI = "mongodb+srv://eriik_ol:AguanteLANUSS@cluster0.bckgf0w.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(URI, (error) => {
    if (error) {
        console.log(`Error de conexion a la base de datos: ${error}`);
    } else {
        console.log("Conexion a la base de datos exitosa");
    }
})