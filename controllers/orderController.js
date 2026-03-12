import orderModel from "../models/orderModel.js"

const getorder = async (req, res) => {
    const orders = await orderModel.find();
    res.render("orders/index", { orders });
};

const placeOrder = async (req, res) => {
    const body = req.body;
    await orderModel.create(body);
    res.redirect("/orders");
};

const addOrderForm = async (req, res) => {
    res.render("orders/add");
};

const deleteOrder = async (req, res) => {
    const id = req.params.id;
    await orderModel.findByIdAndDelete(id);
    res.redirect("/orders");
};

const editOrderForm = async (req, res) => {
    const id = req.params.id;
    const order = await orderModel.findOne({ _id: id });
    res.render("orders/edit", { order });
};

const saveOrder = async (req, res) => {
    const id = req.params.id;
    await orderModel.findByIdAndUpdate(id, req.body);
    res.redirect("/orders")
};



export { getorder, placeOrder, addOrderForm, deleteOrder, editOrderForm, saveOrder }