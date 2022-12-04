const Sequelize = require('sequelize');

const ProductModel = require('../../model/sequelize/ProductModel');
const OrderedProduct = require('../../model/sequelize/OrderedProduct');
const Order = require('../../model/sequelize/Order');

exports.getOrdereds = () => {
    return OrderedProduct.findAll({include: [
            {
                model: ProductModel,
                as: 'productModel'
            },
            {
                model: Order,
                as: 'order'
            }]
    });
};

//TODO in case I needed a get to grab all Ordereds simply implement the thing below

// exports.getOrdereds = () => {
//     return OrderedProduct.findAll();
// };

exports.getOrderedById = (IDordered) => {
    return OrderedProduct.findByPk(IDordered, {include: [
            {
                model: ProductModel,
                as: 'productModel'
            },
            {
                model: Order,
                as: 'order'
            }]
    });
};

exports.createOrdered = (newOrderedData) => {
    console.log(JSON.stringify(newOrderedData)); //TODO if you're looking for the one command printing something, here it is

    return OrderedProduct.create({
        quantity: newOrderedData.quantity,
        ProductModel_IDproduct: newOrderedData.ProductModel_IDproduct,
        Order_IDorder: newOrderedData.Order_IDorder
    });
};

exports.updateOrderedProduct = (IDordered, orderedData) => {
    return OrderedProduct.update(orderedData, {where: {IDorderedProduct: IDordered}}
    );
}

exports.deleteOrderedProduct = (IDordered) => {
    return OrderedProduct.destroy({
        where: {IDorderedProduct: IDordered}
    });
}

exports.deleteManyOrdereds = (orderedsIds) => {
    return OrderedProduct.find({IDorderedProduct: { [Sequelize.Op.in]: orderedsIds}});
}