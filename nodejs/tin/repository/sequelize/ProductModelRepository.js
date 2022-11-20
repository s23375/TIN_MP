const ProductModel = require('../../model/sequelize/ProductModel');
const OrderedProduct = require('../../model/sequelize/OrderedProduct');
const Order = require('../../model/sequelize/Order');

exports.getProducts = () => {
    return ProductModel.findAll();
};

exports.getProductById = (IDproduct) => {
    return ProductModel.findByPk(IDproduct,
        {
        include: [{
            model: OrderedProduct,
            as: 'orderedProducts',
            include: [{
                model: Order,
                as: 'order'
            }]
        }]
    });
};

exports.createProduct = (newProductData) => {
    return ProductModel.create({
        name: 'addProductTest',
        price: 69,
        productionDate: '1996-11-01',
        endDistributionDate: null
    });
};

exports.updateProduct = (IDproduct, productData) => {
    const name = productData.name;
    const price = productData.price;
    const productionDate = productData.productionDate;
    const endDistributionDate = productData.endDistributionDate;
    return ProductModel.update(productData, {where: {IDproduct: IDproduct}});
};

exports.deleteProduct = (IDproduct) => {
    return Employee.destroy({
        where: {IDproduct: IDproduct}
    });
};