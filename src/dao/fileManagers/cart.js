import fs from "fs"
const path = "./carts.json"

const products = []

export default class CartManager{
    getCarts = () => {
        if(fs.existsSync(path)){
            const data = fs.readFileSync(path, "utf-8")
            return JSON.parse(data)
        }else{
            return []
        }
    }

    getProducts = (id) => {
        const carts = this.getCarts()
        if(!id) return {error: "Faltan Datos"}
        if(!(carts.find(c => c.id ==id))) return {error: "Carrito inexistente"}

        const carrito = carts.find(c => c.id == id)

        return carrito.products
    }

    createCart = () => {
        const carts = this.getCarts()

        const cart = {
            products
        }

        if(carts.length === 0){
            cart.id = 1
        }else{
            cart.id = carts[carts.length - 1].id + 1
        }

        carts.push(cart)

        fs.writeFileSync(path, JSON.stringify(carts))

        return ({status: "Ok", message: "Nuevo Carrito"})
    }

    addProductToCart = (cid, pid) => {
        const carts = this.getCarts()

        if(!cid || !pid) return {error: "Faltan Datos"}

        if(!(carts.find(c => c.id == cid))) return ({error: "Carrito inexistente"})

        const carrito = carts.find(c => c.id == cid)

        if(!(carrito.products.find(p => p.pid == pid))){
            let quantity = 1
            carrito.products.push({pid, quantity})
        }else{
            const producto = carrito.products.find(p => p.pid == pid)
            producto.quantity++
        }
        fs.writeFileSync(path, JSON.stringify(carts))

        return ({status: "Ok", message: "Producto agregado"})
    }
}