const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            res.render('pages/Order/list', {
                orders: orders, //products is the passed name we will use in the .ejs template
                navLocation: "order"
            });
        });
}

exports.showAddOrderForm = (req, res, next) => {
    res.render('pages/Order/form', {
        order: {},
        pageTitle: "New order",
        formMode: "createNew",
        btnLabel: "Add order",
        formAction: "/Order/add",
        navLocation: 'order'
    });
}

exports.showOrderDetails = (req, res, next) => {
    const IDorder = req.params.IDorder;
    OrderRepository.getOrderById(IDorder)
        .then(order => {
            res.render("pages/Order/form", {
                order: order,
                pageTitle: "Details of order",
                formMode: "showDetails",
                formAction: "",
                navLocation: "order"
            });
        });
}

exports.showOrderEdit = (req, res, next) => {
    const IDorder = req.params.IDorder;
    OrderRepository.getOrderById(IDorder)
        .then(order => {
            res.render("pages/Order/form", {
                order: order,
                pageTitle: "Edit order",
                formMode: "edit",
                btnLabel: "Edit order",
                formAction: "/Order/edit",
                navLocation: "order"
            });
        });
}

exports.addOrder = (req, res, next) => {
    const orderData = { ...req.body};
    OrderRepository.createOrder(orderData)
        .then(result => {
            res.redirect("/Order/");
        })
};

exports.updateOrder = (req, res, next) => {
    const IDorder = req.body.IDorder;
    const orderData = { ...req.body};
    OrderRepository.updateOrder(IDorder, orderData)
        .then( result => {
            res.redirect("/Order/")
        })
};

exports.deleteOrder = (req, res, next) => {
    const IDorder = req.params.IDorder;// use params not body (??)
    OrderRepository.deleteOrder(IDorder)
        .then( () => {
            res.redirect("/Order/")
        })
};