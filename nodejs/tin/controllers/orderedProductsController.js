exports.showOrderedProductsList = (req, res, next) => {
    res.render('pages/OrderedProducts/list', { navLocation: 'orderedProducts' });
}

exports.showAddOrderedProductsForm = (req, res, next) => {
    res.render('pages/OrderedProducts/form', { navLocation: 'orderedProducts' });
}

exports.showOrderedProductsDetails = (req, res, next) => {
    res.render('pages/OrderedProducts/form-detail', { navLocation: 'orderedProducts' });
}

exports.showOrderedProductsEdit = (req, res, next) => {
    res.render('pages/OrderedProducts/form-edit', { navLocation: 'orderedProducts' });
}