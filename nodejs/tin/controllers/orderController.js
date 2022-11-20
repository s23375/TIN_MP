exports.showOrderList = (req, res, next) => {
    res.render('pages/Order/list', { navLocation: 'order' });
}

exports.showAddOrderForm = (req, res, next) => {
    res.render('pages/Order/form', { navLocation: 'order' });
}

exports.showOrderDetails = (req, res, next) => {
    res.render('pages/Order/form-detail', { navLocation: 'order' });
}

exports.showOrderEdit = (req, res, next) => {
    res.render('pages/Order/form-edit', { navLocation: 'order' });
}