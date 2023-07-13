import { Router } from "express"

//import CartManager from "../dao/fileManagers/cart.js"
import CartManager from "../dao/dbManagers/carts.js"

const manejadorCarrito = new CartManager()

const router = Router()

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid
    const products = await manejadorCarrito.getProducts(cid)
    res.send({products})
})

router.post("/", async (req, res) => {
    const newCart = await manejadorCarrito.createCart()
    res.send(newCart)
})

router.post("/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const productoAgregado = await manejadorCarrito.addProductToCart(cid, pid)

    res.send(productoAgregado)
})

export default router