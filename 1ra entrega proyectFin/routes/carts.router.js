import { Router } from "express"
import CartManager from "../utils/CartManager.js"

const router = Router()
const cartManager = new CartManager()
// Buscar carrito por ID
router.get("/:cid", async(req, res) => {
    const {cid} = req.params
    const cartById = await cartManager.getCartsById(parseInt(cid))
    res.json({cartById})
})
// Subir por ID carrito / ID producto
router.post("/:cid/:pid", async(req, res) => {
    const {cid, pid} = req.params
    const addProdToCart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid))
    res.json({addProdToCart})
})
// Crear carrito
router.post("/", async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.json({addCart})
})

export default router