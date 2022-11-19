exports.showProductModelList = (req, res, next) => {
    res.render('pages/ProductModel/list', {});
}

exports.showAddProductModelForm = (req, res, next) => {
    res.render('pages/ProductModel/form', {});
}

exports.showProductModelDetails = (req, res, next) => {
    res.render('pages/ProductModel/form-detail', {});
}