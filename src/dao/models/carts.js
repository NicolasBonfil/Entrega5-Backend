import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    productsInCart: {
        type: Array,
        required: true
    } 
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)
export default cartsModel