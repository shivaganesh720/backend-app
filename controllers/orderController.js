import OrderModel from "../models/orderModel";

function getOrders(req, res) {
    const orders = OrderModel.find();
    res.json(orders);
    res.send("Orders retrieved successfully");
}


function placeOrder(req, res) {
    const { productId, quantity } = req.body;
    const order = new OrderModel({ products: [{ productId, quantity }] });
    order.save();
    res.json(order);
    res.send("Order placed successfully");
}

function orderStatus(req, res) {
    const { orderId } = req.params;
    const order = OrderModel.findById(orderId);
    if (!order) {
        return res.status(404).send("Order not found");
    }
    const status = order.status;
    res.json({ status });
    res.send("Order status retrieved successfully");
}

function updateOrderStatus(req, res) {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = OrderModel.findById(orderId);
    if (!order) {
        return res.status(404).send("Order not found");
    }
    order.status = status;
    order.save();
    res.json(order);
    res.send("Order status updated successfully");
}


export { getOrders, placeOrder, orderStatus, updateOrderStatus };  