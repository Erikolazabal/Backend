import { Router } from "express";
import cartsController from '../controllers/carts.controllers.js'


const router = Router()

//Buscar cart por ID
router.get('/:cartId', cartsController.getCartById)

//Crear carrito
router.post('/', cartsController.createCart)

//subir el producto dentro de un carrito
router.post('/:cartId/product/:prodId', cartsController.addProductToCart)

//Actualizar la cantidad de productos dentro de un carrito
router.put('/:cartId/products/:prodId', cartsController.updateProductQuantity)

router.delete('/:cartId/products/:prodId', cartsController.deleteProductFromCart)

router.delete('/:cartId', cartsController.emptyCart)

export default router