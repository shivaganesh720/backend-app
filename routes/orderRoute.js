import { getOrders, placeOrder, orderStatus, updateOrderStatus } from "../controllers/orderController";
import express from "express"
const orderRouter = express.Router()

orderRouter.get("/", getOrders)
orderRouter.post("/place", placeOrder)
orderRouter.get("/status/:orderId", orderStatus)
orderRouter.put("/status/:orderId", updateOrderStatus)

export default orderRouter