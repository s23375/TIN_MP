const OrderedProductRepository = require('../repository/sequelize/OrderedProductsRepository');
const ProductModelRepository = require('../repository/sequelize/ProductModelRepository');

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
    ProductModelRepository.getProducts()
        .then(allProducts => {
            res.render('pages/OrderedProducts/form', {
                ordered: {},
                allProducts: allProducts,
                pageTitle: "New orderedProduct",
                formMode: "createNew",
                btnLabel: "Add orderedProduct",
                formAction: "/OrderedProducts/add",
                navLocation: 'orderedProducts'
            });
        });
}

exports.showOrderedProductsDetails = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    ProductModelRepository.getProducts()
        .then( allProducts => {
            OrderedProductRepository.getOrderedById(IDordered)
                .then(ordered => {
                    res.render("pages/OrderedProducts/form", {
                        ordered: ordered,
                        allProducts: allProducts,
                        pageTitle: "Details of ordered product",
                        formMode: "showDetails",
                        formAction: "",
                        navLocation: 'orderedProducts'
                    });
                });
        });
}

exports.showOrderedProductsEdit = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    ProductModelRepository.getProducts()
        .then( allProducts => {
            OrderedProductRepository.getOrderedById(IDordered)
                .then(ordered => {
                    res.render("pages/OrderedProducts/form", {
                        ordered: ordered,
                        allProducts: allProducts,
                        pageTitle: "Edit ordered product",
                        formMode: "edit",
                        btnLabel: "Edit orderedProduct",
                        formAction: "/OrderedProducts/edit",
                        navLocation: 'orderedProducts'
                    });
                });
        })

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