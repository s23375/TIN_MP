const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.getOrders = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getOrderById = (req, res, next) => {
    const IDorder = req.params.IDorder;
    OrderRepository.getOrderById(IDorder)
        .then(order => {
            if(!order) {
                res.status(404).json({
                    message: "Order with id: "+IDorder+" not found" //TODO TIL(today I learned) - you can use "" or '', it's preference but JSON uses "" so using '' may prove problematic at some point in life
                })
            } else {
                res.status(202).json(order);
            }
        });
};

exports.createOrder = (req, res, next) => {
    OrderRepository.createOrder(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            res.status(500).json(err.errors)
        });
};

exports.updateProduct = (req, res, next) => {
    const IDorder = req.params.IDorder;
    OrderRepository.updateOrder(IDorder, req.body)
        .then(result => {
            res.status(200).json({message: "Order updated!", order: result});
        })
        .catch(err => {
            res.status(500).json(err.errors)
        })
}

exports.deleteOrder = (req, res, next) => {
    const IDorder = req.params.IDorder;
    OrderRepository.deleteOrder(IDorder)
        .then(result => {
            res.status(200).json({message: "Removed order ID: "+IDorder, order: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}