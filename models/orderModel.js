import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
        },
    ],
    status: { type: String, default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },


});
const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;