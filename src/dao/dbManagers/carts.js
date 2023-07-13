import cartsModel from "../models/carts.js"

export default class Carts{
    constructor(){
        console.log("Estamos trabajando con bd mongo");
    }

    getCarts = async () => {
        let carts = await cartsModel.find().lean()
        return carts
    }

    createCart = async () => {
        const carts = await this.getCarts()

        const products = []

        const cart = {
            products
        }

        if(carts.length === 0){
            cart.id = 1
        }else{
            cart.id = carts[carts.length - 1].id + 1
        }

        let result = await cartsModel.create(cart)

        return ({status: "success", payload: result})
    }

    getProducts = async (cid) => {
        const cart = await cartsModel.findOne({id: cid})
        
        if(!cid) return ({status: "error", error: "Faltan datos"})

        if(!cart) return ({status: "error", error: "Carrito inexistente"})

        return cart.productsInCart
    }

    addProductToCart = async (cid, pid) => {
        const cart = await cartsModel.findOne({id: cid})

        if(!cid || !pid) return ({status: "error", error: "Faltan datos"})

        if(!cart) return ({status: "error", error: "Carrito inexistente"})

        const productIndex = cart.productsInCart.findIndex((p) => p.id == pid);

        if(productIndex == -1){
            let quantity = 1
            await cart.productsInCart.push({id: pid, quantity})
        }else{
            cart.productsInCart[productIndex].quantity = parseInt(cart.productsInCart[productIndex].quantity)+1;
        }

        await cartsModel.updateOne({ id: cart.id }, cart);
        return ({status: "success", payload: cart})
    }
}
