import mongoose, { mongo } from 'mongoose'
import { UserDocument } from './user.model'
//import { customAlphabet } from "nanoid"
//import { nanoid } from 'nanoid'

//OLD
//const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ProductDocument extends mongoose.Document {
    user: UserDocument["_id"];
    title: string
    description: string
    price: number
    image: string
    /**
     * TimeStamps is true
     */
    createdAt: Date;
    /**
     * TimeStamps is true
     */
    updatedAt: Date;
}

const productSchema = new mongoose.Schema({
    //NOT NECESSARY, We can still use mongo _id
    productId: {
        type: String,
        required: true,
        unique: true,
        //default: () => `product_${nanoid()}`
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
},
    {
        timestamps: true
    })

//Missing type. More info here -> https://github.com/Automattic/mongoose/issues/11449

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel