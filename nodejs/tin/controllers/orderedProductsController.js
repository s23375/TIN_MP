const OrderedProductRepository = require('../repository/sequelize/OrderedProductsRepository');

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
    res.render('pages/OrderedProducts/form', {
        ordered: {},
        pageTitle: "New orderedProduct",
        formMode: "createNew",
        btnLabel: "Add orderedProduct",
        formAction: "/OrderedProducts/add",
        navLocation: 'orderedProducts'
    });
}

exports.showOrderedProductsDetails = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductRepository.getOrderedById(IDordered)
        .then(ordered => {
            res.render("pages/OrderedProducts/form", {
                ordered: ordered,
                pageTitle: "Details of ordered product",
                formMode: "showDetails",
                formAction: "",
                navLocation: 'orderedProducts'
            });
        });
}

exports.showOrderedProductsEdit = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductRepository.getOrderedById(IDordered)
        .then(ordered => {
            res.render("pages/OrderedProducts/form", {
                ordered: ordered,
                pageTitle: "Edit ordered product",
                formMode: "edit",
                btnLabel: "Edit orderedProduct",
                formAction: "/OrderedProducts/edit",
                navLocation: 'orderedProducts'
            });
        });
}

exports.addOrderedProduct = (req, res, next) => {
    const orderedData = {...req.body};
    OrderedProductRepository.createOrdered(orderedData)
    .then(result => {
        res.redirect("/OrderedProducts/");
    });
};

exports.updateOrderedProduct = (req, res, next) => {
    const IDordered = req.body.IDorderedProduct;
    const orderedData = {...req.body};
    OrderedProductRepository.updateOrderedProduct(IDordered, orderedData)
        .then(result => {
            res.redirect("/OrderedProducts/");
        });
}

exports.deleteOrderedProduct = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductRepository.deleteOrderedProduct(IDordered)
        .then(result => {
            res.redirect("/OrderedProducts/");
        });
}