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
    if(!newOrderData.datePlaced) newOrderData.datePlaced = Date.now();

    if(newOrderData.premiumDelivery === undefined) newOrderData.premiumDelivery = false
    else newOrderData.premiumDelivery = true

    //it'll be this way for now at least
    //I TRIED USING A SWITCH BUT IT JUST DOES WHATEVER IT WANTS
    if(newOrderData.shippingCompany === "1") newOrderData.shippingCompany = "DHL";
    else if(newOrderData.shippingCompany === "2") newOrderData.shippingCompany = "Inpost";
    else if(newOrderData.shippingCompany === "3") newOrderData.shippingCompany = "Poczta Polska";

    return Order.create({
        datePlaced: newOrderData.datePlaced,
        clientContactInfo: newOrderData.clientContactInfo,
        shippingCompany: newOrderData.shippingCompany,
        premiumDelivery: newOrderData.premiumDelivery
    });
};

exports.updateOrder = (IDorder, newOrderData) => {
    if(!newOrderData.datePlaced) newOrderData.datePlaced = Date.now();

    if(newOrderData.shippingCompany === "1") newOrderData.shippingCompany = "DHL";
    else if(newOrderData.shippingCompany === "2") newOrderData.shippingCompany = "Inpost";
    else if(newOrderData.shippingCompany === "3") newOrderData.shippingCompany = "Poczta Polska";

    if(newOrderData.premiumDelivery === undefined) newOrderData.premiumDelivery = false
    else newOrderData.premiumDelivery = true

    return Order.update(newOrderData, {where: {IDorder: IDorder}});
};

exports.deleteOrder = (IDorder) => {
    return Order.destroy({
        where: {IDorder: IDorder}
    });
};