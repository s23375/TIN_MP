const ProductModelRepository = require('../repository/sequelize/ProductModelRepository');

exports.getProducts = (req, res, next) => {
    ProductModelRepository.getProducts()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProductById = (req, res, next) => {
    const IDproduct = req.params.IDproduct;
    ProductModelRepository.getProductById(IDproduct)
        .then(product => {
            if(!product) {
                res.status(404).json({
                    message: 'Product with id: '+IDproduct+' not found'
                })
            } else {
                res.status(202).json(product); // had to add (202) to status for this to work, otherwise it'd throw a .json is not a function
            }
        });
};

exports.createProduct = (req, res, next) => {
    ProductModelRepository.createProduct(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            res.status(500).json(err.errors)
        });
};

exports.updateProduct = (req, res, next) => {
    const IDproduct = req.params.IDproduct;
    ProductModelRepository.updateProduct(IDproduct, req.body)
        .then(result => {
            res.status(200).json({message: 'Product updated!', product: result});
        })
        .catch(err => {
            res.status(500).json(err.errors)
        });
};

exports.deleteProduct = (req, res, next) => {
    const IDproduct = req.params.IDproduct;
    ProductModelRepository.deleteProduct(IDproduct)
        .then(result => {
            res.status(200).json({message: 'Removed product ID: '+IDproduct, product: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};