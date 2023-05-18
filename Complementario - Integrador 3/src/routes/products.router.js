import { Router } from "express";
import productsController from "../controllers/products.controllers.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import isPremium from "../middlewares/isPremium.middleware.js";

const router = Router()

// Obtener todos los productos o productos limitados
router.get('/', productsController.getProducts)

// Obtener producto por ID
router.get('/:prodId', productsController.getProductById)

// Agregar producto
router.post('/', isAdmin, productsController.addProduct)

//Agregar producto premium
router.post('/premium', isPremium, productsController.addPremiumProduct)

// Eliminar producto por ID
router.delete('/:prodId', isAdmin, productsController.deleteProduct)

// Actualizar producto por ID
router.put('/:prodId', isAdmin, productsController.updateProduct)

export default router