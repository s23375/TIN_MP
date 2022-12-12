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
        navLocation: 'order',
        validationErrors: []
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
                navLocation: "order",
                validationErrors: []
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
                navLocation: "order",
                validationErrors: []
            });
        });
}

exports.addOrder = (req, res, next) => {
    const orderData = { ...req.body};
    OrderRepository.createOrder(orderData)
        .then(result => {
            res.redirect("/Order/");
        })
        .catch(err => {
            res.render("pages/Order/form", {
                order: orderData,
                pageTitle: "New order",
                formMode: "createNew",
                btnLabel: "Add order",
                formAction: "/Order/add",
                navLocation: 'order',
                validationErrors: err.errors
            })
        })
};

exports.updateOrder = (req, res, next) => {
    const IDorder = req.body.IDorder;
    const orderData = { ...req.body};

    OrderRepository.updateOrder(IDorder, orderData)
        .then( result => {
            res.redirect("/Order/")
        })
        .catch(err => {
            OrderRepository.getOrderById(IDorder)
                .then(oldInfo => {
                    //I tried making this as a method in Repository but it was throwing weird errors, sometimes even saying IDorder is undefined
                    // when it printed "1" a few lines before, truly a DS of back-end functionalities
                    oldInfo.clientContactInfo = orderData.clientContactInfo;
                    oldInfo.shippingCompany = orderData.shippingCompany;
                    oldInfo.premiumDelivery = orderData.premiumDelivery;

                    res.render("pages/Order/form", {
                        order: oldInfo,
                        pageTitle: "Edit order",
                        formMode: "edit",
                        btnLabel: "Edit order",
                        formAction: "/Order/edit",
                        navLocation: "order",
                        validationErrors: err.errors
                    })
                })
        })
};

exports.deleteOrder = (req, res, next) => {
    const IDorder = req.params.IDorder;// use params not body (??)
    OrderRepository.deleteOrder(IDorder)
        .then( () => {
            res.redirect("/Order/")
        })
};