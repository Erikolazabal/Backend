import { Router } from "express";
import cartsController from "../controllers/carts.controllers.js";
import isLogged from "../middlewares/isLogged.middleware.js";


const router = Router()

// Obtener carrito por ID
router.get('/:cartId', cartsController.getCartById)

// Crear carrito
router.post('/', cartsController.createCart)

// Agregar un producto a un carrito
router.post('/:cartId/product/:prodId', isLogged, cartsController.addProductToCart)

// Actualizar la cantidad de un producto en un carrito
router.put('/:cartId/products/:prodId', isLogged, cartsController.updateProductQuantity)

// Eliminar un producto de un carrito
router.delete('/:cartId/products/:prodId', isLogged, cartsController.deleteProductFromCart)

// Vaciar el contenido de un carrito
router.delete('/:cartId', isLogged, cartsController.emptyCart)

// Comprar el contenido de un carrito
router.post('/:cartId/purchase', isLogged, cartsController.purchase)

export default router