import { Router } from "express";
import productsController from '../controllers/products.controllers.js'

const router = Router()

//Obtenga todos los productos
router.get('/', productsController.getProducts)

//Traer product por ID
router.get('/:prodId', productsController.getProductById)

//Añadir producto
router.post('/', productsController.addProduct)

//Eliminar producto por ID
router.delete('/:prodId', productsController.deleteProduct)

//Actualizar producto por Id
router.put('/:prodId', productsController.updateProduct)

export default router