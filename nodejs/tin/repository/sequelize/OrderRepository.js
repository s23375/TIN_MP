const ProductModel = require('../../model/sequelize/ProductModel');
const OrderedProduct = require('../../model/sequelize/OrderedProduct');
const Order = require('../../model/sequelize/Order');
const {getOrderById} = require("../../api/OrderAPI");

exports.getOrders = () => {
    return Order.findAll();
};

exports.getOrderById = (IDorder) => {
    return Order.findByPk(IDorder,
        {
            include: [{
                model: OrderedProduct,
                as: 'orderedProducts',
                include: [{
                    model:ProductModel,
                    as: 'productModel'
                }]
            }]
        });
};

exports.createOrder = (newOrderData) => {
    if(!newOrderData.datePlaced) newOrderData.datePlaced = Date.now();

    return Order.create({
        datePlaced: newOrderData.datePlaced,
        clientContactInfo: newOrderData.clientContactInfo,
        shippingCompany: newOrderData.shippingCompany,
        premiumDelivery: newOrderData.premiumDelivery
    });
};

exports.updateOrder = (IDorder, newOrderData) => {
    if(!newOrderData.datePlaced) newOrderData.datePlaced = Date.now();

    return Order.update(newOrderData, {where: {IDorder: IDorder}});
};

exports.deleteOrder = (IDorder) => {
    return Order.destroy({
        where: {IDorder: IDorder}
    });
};