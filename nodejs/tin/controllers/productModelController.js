exports.showProductModelList = (req, res, next) => {
    res.render('pages/ProductModel/list', { navLocation: 'productModel' });
}

exports.showAddProductModelForm = (req, res, next) => {
    res.render('pages/ProductModel/form', { navLocation: 'productModel' });
}

exports.showProductModelDetails = (req, res, next) => {
    res.render('pages/ProductModel/form-detail', { navLocation: 'productModel' });
}