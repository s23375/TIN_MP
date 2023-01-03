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
        pageTitle: req.__("product.form.add.pageTitle"),
        formMode: "createNew",
        btnLabel: req.__("product.form.add.btnLabel"),
        formAction: "/ProductModel/add",
        navLocation: "productModel",
        validationErrors: []
    });
}

exports.showProductModelDetails = (req, res, next) => {
    const productID = req.params.IDproduct;
    ProductModelRepository.getProductById(productID)
        .then(product => {
            res.render('pages/ProductModel/form', { // changed this to just "form"...
                product: product,
                pageTitle: req.__("product.form.details"),
                formMode: "showDetails",
                //btnLabel: "Details of productModel",
                formAction: "",
                navLocation: "productModel",
                validationErrors: []
            });
        });
}

exports.showProductModelEdit = (req, res, next) => {
    const productID = req.params.IDproduct;
    ProductModelRepository.getProductById(productID)
        .then(product => {
            res.render('pages/ProductModel/form', {
                product: product,
                pageTitle: req.__("product.form.edit.pageTitle"),
                formMode: "edit",
                btnLabel: req.__("product.form.edit.btnLabel"),
                formAction: "/ProductModel/edit",
                navLocation: "productModel",
                validationErrors: []
            });
        });
};

exports.addProductModel = (req, res, next) => {
    const productData = { ...req.body};
    ProductModelRepository.createProduct(productData)
        .then(result => {
            res.redirect("/ProductModel/");
        })
        .catch(err => {
            res.render("pages/ProductModel/form", {
                product: productData,
                pageTitle: "New productModel",
                formMode: "createNew",
                btnLabel: "Add productModel",
                formAction: "/ProductModel/add",
                navLocation: "productModel",
                validationErrors: err.errors
            })
        })
};

exports.updateProductModel = (req, res, next) => {
    const IDproduct = req.body.IDproduct;
    const productData = { ...req.body};
    ProductModelRepository.updateProduct(IDproduct, productData)
        .then( result => {
            res.redirect("/ProductModel/")
        })
        .catch(err => {
            res.render("pages/ProductModel/form", {
                product: productData,
                pageTitle: "Edit productModel",
                formMode: "edit",
                btnLabel: "Edit productModel",
                formAction: "/ProductModel/edit",
                navLocation: "productModel",
                validationErrors: err.errors
            })
        })
};

exports.deleteProductModel = (req, res, next) => {
    const IDproduct = req.params.IDproduct;// use params not body (??)
    ProductModelRepository.deleteProduct(IDproduct)
        .then( () => {
            res.redirect("/ProductModel/")
        })
};