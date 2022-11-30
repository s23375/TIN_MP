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
    return ProductModel.create({ // turns out that names of the files assigned in .html(or .ejs now) are used in the request. Good to know it mattered.
        name: newProductData.name,
        price: newProductData.price,
        productionDate: newProductData.productionDate,
        endDistributionDate: newProductData.endDistributionDate
    });
};

exports.updateProduct = (IDproduct, productData) => {
    // const name = productData.name;
    // const price = productData.price;
    // const productionDate = productData.productionDate;
    // const endDistributionDate = productData.endDistributionDate;
    return ProductModel.update(productData, {where: {IDproduct: IDproduct}});
};

exports.deleteProduct = (IDproduct) => {
    return ProductModel.destroy({
        where: {IDproduct: IDproduct}
    });
};