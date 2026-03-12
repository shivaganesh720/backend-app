import { placeOrder, orderStatus } from "../controllers/orderController";
import express from "express"
const orderRouter = express.Router()

orderRouter.post("/place", placeOrder)
orderRouter.get("/status/:orderId", orderStatus)

export default orderRouter