const ProductModelRepository = require('../repository/sequelize/ProductModelRepository');

exports.showProductModelList = (req, res, next) => {
    ProductModelRepository.getProducts()
        .then(products => {
            res.render('pages/ProductModel/list', {
                products: products, //products is the passed name we will use in the .ejs template
                navLocation: "productModel"
            });
        });
}

exports.showAddProductModelForm = (req, res, next) => {
    res.render('pages/ProductModel/form', {
        product: {},
        pageTitle: "New productModel",
        formMode: "createNew",
        btnLabel: "Add productModel",
        formAction: "/ProductModel/add",
        navLocation: "productModel"
    });
}

exports.showProductModelDetails = (req, res, next) => {
    const productID = req.params.IDproduct;
    ProductModelRepository.getProductById(productID)
        .then(product => {
            res.render('pages/ProductModel/form-detail', {
                product: product,
                pageTitle: "Details of productModel",
                formMode: "showDetails",
                //btnLabel: "Details of productModel",
                formAction: "",
                navLocation: "productModel"
            });
        });
}

exports.showProductModelEdit = (req, res, next) => {
    const productID = req.params.IDproduct;
    ProductModelRepository.getProductById(productID)
        .then(product => {
            res.render('pages/ProductModel/form-edit', {
                product: product,
                pageTitle: "Edit productModel",
                formMode: "edit",
                btnLabel: "Edit productModel",
                formAction: "/ProductModel/edit",
                navLocation: "productModel"
            });
        });
};