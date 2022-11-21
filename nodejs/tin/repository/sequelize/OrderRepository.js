const ProductModel = require('../../model/sequelize/ProductModel');
const OrderedProduct = require('../../model/sequelize/OrderedProduct');
const Order = require('../../model/sequelize/Order');

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
    return Order.create({
        datePlaced: newOrderData.datePlaced,
        clientContactInfo: newOrderData.clientContactInfo,
        shippingCompany: newOrderData.shippingCompany,
        premiumDelivery: newOrderData.premiumDelivery
    });
};

exports.updateOrder = (IDorder, orderData) => {
    return Order.update(orderData, {where: {IDorder: IDorder}});
};

exports.deleteOrder = (IDorder) => {
    return Order.destroy({
        where: {IDorder: IDorder}
    });
};