import { Router } from "express";
import CartManager from "../dao/services/mongoManagers/CartManager.js";

// Administrador de carts con FS
// import CartManager from "../dao/services/fileManagers/CartManager.js";
// const cartManager = new CartManager('src/data/carts.json')

//Administrador de carritos con MongoDB
const cartManager = new CartManager()

const router = Router()

//Traer todos los carts
router.get('/', async (req,res) => {
    try {
        const carts = await cartManager.getCarts()
        res.send(carts)
    } catch (error) {
        res.send(error)
    }
})

//Buscar cart por ID
router.get('/:cartId', async (req,res) => {
    const {cartId} = req.params
    try {
        const cart = await cartManager.getCartById(cartId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req,res) => {
    console.log("post llamado");
    try {
        const cart = await cartManager.createCart()
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.post('/:cartId/product/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    try {
        const product = await cartManager.addProductInCart(cartId, prodId)
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

//múltiples productos dentro de un carrito
router.put('/:cartId', async (req,res) => {
    const {cartId} = req.params
    const newProducts = req.body
    try {
        const cart = await cartManager.addProductsToCart(cartId, newProducts)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

//Actualizar la cantidad de productos dentro de un carrito
router.put('/:cartId/products/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    const {quantity} = req.body
    try {
        const cart = await cartManager.updateProductInCartQuantity(cartId, prodId, quantity)
        res.send(cart)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.delete('/:cartId/products/:prodId', async (req,res) => {
    const {cartId, prodId} = req.params
    try {
        const cart = await cartManager.deleteProdInCart(cartId, prodId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:cartId', async (req,res) => {
    const {cartId} = req.params
    try {
        const cart = await cartManager.deleteAllProductsInCart(cartId)
        res.send(cart)
    } catch (error) {
        res.send(error)
    }
})

export default router