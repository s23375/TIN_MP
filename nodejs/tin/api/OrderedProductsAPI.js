const OrderedProductsRepository = require('../repository/sequelize/OrderedProductsRepository');

exports.getOrdereds = (req, res, next) => {
    OrderedProductsRepository.getOrdereds()
        .then(ordereds => {
            res.status(200).json(ordereds);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getOrderedById = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductsRepository.getOrderedById(IDordered)
        .then(ordered => {
            if(!ordered) {
                res.status(404).json({
                    message: 'OrderedProduct with id: '+IDordered+' not found'
                })
            } else {
                res.status(202).json(ordered);
            }
        });
};

exports.createOrdered = (req, res, next) => {
    OrderedProductsRepository.createOrdered(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            res.status(500).json(err.errors)
        });
};

exports.updateOrdered = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductsRepository.updateOrderedProduct(IDordered, req.body)
        .then(result => {
            res.status(200).json({message: 'OrderedProduct updated!', ordered: result});
        })
        .catch(err => {
            res.status(500).json(err.errors)
        });
};

exports.deleteProduct = (req, res, next) => {
    const IDordered = req.params.IDorderedProduct;
    OrderedProductsRepository.deleteOrderedProduct(IDordered)
        .then(result => {
            res.status(200).json({message: 'Removed orderedProducts ID: '+IDordered, ordered: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};