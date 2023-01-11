const sequelize = require('./sequelize');

const ProductModel = require('../../model/sequelize/ProductModel');
const OrderedProduct = require('../../model/sequelize/OrderedProduct');
const Order = require('../../model/sequelize/Order');
const User = require("../../model/sequelize/User");

const authUtil = require("../../utils/authUtil");
const passHash = authUtil.hashPassword("123");

/*
to learn more about .hasMany, .belongsTo(as well as .hasOne and .belongsToMany): https://sequelize.org/docs/v6/core-concepts/assocs/
here's the important bit:
The A.belongsTo(B) association means that a One-To-One relationship exists between A and B, with the foreign key being defined in the source model (A).
The A.hasMany(B) association means that a One-To-Many relationship exists between A and B, with the foreign key being defined in the target model (B).
 */
module.exports = () => {
    ProductModel.hasMany(OrderedProduct, {as: 'orderedProducts', foreignKey: {name: 'ProductModel_IDproduct', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    OrderedProduct.belongsTo(ProductModel, {as: 'productModel', foreignKey: {name: 'ProductModel_IDproduct', allowNull: false} } );
    Order.hasMany(OrderedProduct, {as: 'orderedProducts', foreignKey: {name: 'Order_IDorder', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    OrderedProduct.belongsTo(Order, {as: 'order', foreignKey: {name: 'Order_IDorder', allowNull: false} } );

    let allProducts, allOrders;
    return sequelize
        .sync({force: true})
        .then( () => {
            return ProductModel.findAll();
        })
        .then(products => {
            if(!products || products.length === 0) {
                return ProductModel.bulkCreate([
                    {name: 'AxceletronDB120', price: 100, productionDate: '2022-09-16', endDistributionDate: null},
                    {name: 'PlasticSeries Friend 360', price: 50, productionDate: '2021-02-04', endDistributionDate: null},
                    {name: 'Basix e11', price: 5, productionDate: '2021-02-04', endDistributionDate: '2022-11-09'}
                ])
                    .then(() => {
                        return ProductModel.findAll();
                    });
            }else {
                return products;
            }
        })
        .then( products => {
            allProducts = products;
            return Order.findAll();
        })
        .then( orders => {
            if(!orders || orders.length === 0) {
                return Order.bulkCreate([
                    {datePlaced: '2022-10-12', clientContactInfo: 'BMIgeneral@bmi.com', shippingCompany: 'DHL', premiumDelivery: true},
                    {datePlaced: '2022-10-13', clientContactInfo: 'daniel@gmail.com', shippingCompany: 'Inpost', premiumDelivery: false},
                    {datePlaced: '2022-10-13', clientContactInfo: 'eilenedover@gmail.com', shippingCompany: 'DHL', premiumDelivery: false},
                    {datePlaced: '2022-12-18', clientContactInfo: 'maleniaBladeOfMiquella@gmail.com', shippingCompany: 'Inpost', premiumDelivery: true}
                ])
                    .then ( () => {
                        return Order.findAll(); //TODO 2. changed from ProductModel. to Order.
                    });
            } else {
                return orders;
            }
        })
        .then( orders => {
            allOrders = orders;
            return OrderedProduct.findAll(); //TODO 3. changed from ProductModel to OrderedProduct, the tutorial was pretty flawless until now..
        })
        .then( ordereds => {
            if(!ordereds || ordereds.length === 0) {
                return OrderedProduct.bulkCreate([ //TODO 1. appears to not work, changed from Order. to OrderedProduct.
                    {quantity: 1, ProductModel_IDproduct: allProducts[0].IDproduct, Order_IDorder: allOrders[0].IDorder}, //don't forget about .IDorder lol
                    {quantity: 2, ProductModel_IDproduct: allProducts[1].IDproduct, Order_IDorder: allOrders[0].IDorder},
                    {quantity: 2, ProductModel_IDproduct: allProducts[0].IDproduct, Order_IDorder: allOrders[1].IDorder},
                    {quantity: 7, ProductModel_IDproduct: allProducts[2].IDproduct, Order_IDorder: allOrders[2].IDorder}
                ]);
            } else {
                return ordereds;
            }
        })
        .then( ordereds => {
            return User.findAll();
        })
        .then(users => {
            if(!users || users.length === 0) {
                return User.bulkCreate([
                {firstName: "Bartek", lastName: "Janowski", email: "guwnoimejl@gmail.com", password: passHash}
                ]);
            } else {
                return users;
            }
        });
};