const OrderedProductRepository = require('../repository/sequelize/OrderedProductsRepository');
const ProductModelRepository = require('../repository/sequelize/ProductModelRepository');
const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.showOrderedProductsList = (req, res, next) => {
    OrderedProductRepository.getOrdereds()
        .then(orderds => {
            res.render("pages/OrderedProducts/list", {
                orderds: orderds,
                navLocation: 'orderedProducts'
            });
        });
}

exports.showAddOrderedProductsForm = (req, res, next) => {
    OrderRepository.getOrders()
        .then( allOrders => {
            ProductModelRepository.getProducts()
                .then(allProducts => {
                    res.render('pages/OrderedProducts/form', {
                        ordered: {},
                        allProducts: allProducts,
                        allOrders: allOrders,
                        pageTitle: "New orderedProduct",
                        formMode: "createNew",
                        btnLabel: "Add orderedProduct",
                        formAction: "/OrderedProducts/add",
                        navLocation: 'orderedProducts',
                        validationErrors: []
                    });
                });
        })
}

exports.showOrderedProductsDetails = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;

    OrderRepository.getOrders()
        .then( allOrders => {
            ProductModelRepository.getProducts()
                .then( allProducts => {
                    OrderedProductRepository.getOrderedById(IDordered)
                        .then(ordered => {
                            res.render("pages/OrderedProducts/form", {
                                ordered: ordered,
                                allProducts: allProducts,
                                allOrders: allOrders,
                                pageTitle: "Details of ordered product",
                                formMode: "showDetails",
                                formAction: "",
                                navLocation: 'orderedProducts',
                                validationErrors: []
                            });
                        });
                });
        })
}

exports.showOrderedProductsEdit = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;

    OrderRepository.getOrders()
        .then( allOrders => {
            ProductModelRepository.getProducts()
                .then( allProducts => {
                    OrderedProductRepository.getOrderedById(IDordered)
                        .then(ordered => {
                            res.render("pages/OrderedProducts/form", {
                                ordered: ordered,
                                allProducts: allProducts,
                                allOrders: allOrders,
                                pageTitle: "Edit ordered product",
                                formMode: "edit",
                                btnLabel: "Edit orderedProduct",
                                formAction: "/OrderedProducts/edit",
                                navLocation: 'orderedProducts',
                                validationErrors: []
                            });
                        });
                })
        })
}

exports.addOrderedProduct = (req, res, next) => {
    const orderedData = {...req.body};
    const template = {
        OrderedProduct: {
            // the tutorial told us to check in the form if there is AN ID when displaying the drop-down list, so I just put whatever there so it works
                IDorderedProduct: 999,
                quantity: orderedData.quantity,
                ProductModel_IDproduct: orderedData.ProductModel_IDproduct,
                Order_IDorder: orderedData.Order_IDorder,
                productModel: {
                    IDproduct: orderedData.ProductModel_IDproduct
                },
                order: {
                    IDorder: orderedData.Order_IDorder
                }
        }
    }

    OrderRepository.getOrders()
        .then( allOrders => {
            ProductModelRepository.getProducts()
                .then( allProducts => {
                    OrderedProductRepository.createOrdered(orderedData)
                        .then(result => {
                            res.redirect("/OrderedProducts/");
                        })
                        .catch(err => {
                            res.render("pages/OrderedProducts/form", {
                                ordered: template.OrderedProduct,
                                allProducts: allProducts,
                                allOrders: allOrders,
                                pageTitle: "New orderedProduct",
                                formMode: "createNew",
                                btnLabel: "Add orderedProduct",
                                formAction: "/OrderedProducts/add",
                                navLocation: 'orderedProducts',
                                validationErrors: err.errors
                            })
                        })
                })
        })
};

exports.updateOrderedProduct = (req, res, next) => {
    const IDordered = req.body.IDorderedProduct;
    const orderedData = {...req.body};

    OrderRepository.getOrders()
        .then( allOrders => {
            ProductModelRepository.getProducts()
                .then( allProducts => {
                    OrderedProductRepository.updateOrderedProduct(IDordered, orderedData)
                        .then(result => {
                            res.redirect("/OrderedProducts/");
                        })
                        .catch(err => {
                            OrderedProductRepository.getOrderedById(IDordered)
                                .then(oldInfo => {
                                    oldInfo.quantity = orderedData.quantity;
                                    oldInfo.ProductModel_IDproduct = orderedData.ProductModel_IDproduct;
                                    oldInfo.Order_IDorder = orderedData.Order_IDorder;
                                    // dataValues idk
                                    oldInfo.productModel.dataValues.IDproduct = orderedData.ProductModel_IDproduct;
                                    oldInfo.order.dataValues.IDorder = orderedData.Order_IDorder;

                                    res.render("pages/OrderedProducts/form", {
                                        ordered: oldInfo,
                                        allProducts: allProducts,
                                        allOrders: allOrders,
                                        pageTitle: "Edit ordered product",
                                        formMode: "edit",
                                        btnLabel: "Edit orderedProduct",
                                        formAction: "/OrderedProducts/edit",
                                        navLocation: 'orderedProducts',
                                        validationErrors: err.errors
                                    })
                                })

                        })
                })
        })

}

exports.deleteOrderedProduct = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductRepository.deleteOrderedProduct(IDordered)
        .then(result => {
            res.redirect("/OrderedProducts/");
        });
}