import { Router } from "express";

// Gerente de producto con FS
// import ProductManager from "../dao/services/fileManagers/ProductManager.js";

// Gerente de producto con MongoDB
import ProductManager from "../dao/services/mongoManagers/ProductManager.js";


const router = Router()
const productManager = new ProductManager()

// Obtenga todos los productos
router.get('/', async (req,res) => {
    try {
        const products = await productManager.getProducts()
        const {limit} = req.query
        if(products.length > 0) {
            if(limit){
                const limitedProducts = products.slice(0, limit)
                res.send(limitedProducts)
            } else {
                res.send(products)
            }
        } else {
            res.send("No se encontraron productos")
        }
    } catch (error) {
        res.send(error)
    }
})

//Traer product por ID
router.get('/:idProduct', async (req,res)=>{
    const {idProduct} = req.params
    try {
        const product = await productManager.getProductById(idProduct)
        if(product){
            res.json({mesagge:'Producto encontrado', product})
        } else {
            res.json({mesagge:'Producto no encontrado'})
        }
    } catch (error) {
        res.send(error)
    }
})

//Añadir producto
router.post('/', async (req,res) => {
    const newProd = req.body
    try {
        const product = await productManager.addProduct(newProd)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

//Eliminar producto por ID
router.delete('/:idProduct', async (req,res) => {
    try {
        const {idProduct} = req.params
        const deletedProd = await productManager.deleteProduct(idProduct)
        res.send(deletedProd)
    } catch (error) {
        res.send(error)
    }
})

//Actualizar producto por Id
router.put('/:idProduct', async (req,res) => {
    const {idProduct} = req.params
    const updatedFields = req.body
    try {
        const updatedProd = await productManager.updateProduct(idProduct, updatedFields)
        res.send(updatedProd)
    } catch (error) {
        res.send(error)
    }
})

export default router