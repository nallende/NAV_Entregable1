const Product = require('../models/product');

exports.getProductForm = (req, res, next) => {
    res.render('add-product', {
        name: 'Nicolas',
        path: '/admin/add-product',
        pagetitle: 'Add Product',
    });
};

exports.postProduct = (req, res, next) => {
    const timestamp = req.body.datetime();
    const name = req.body.name;
    const description = req.body.description;
    const code = req.body.code;
    const imageUrl = req.body.imageURL;
    const price = req.body.price;
    const stock = req.body.stock;

    const prod = new Product(
        null,
        timestamp,
        name,
        description,
        code,
        imageUrl,
        price,
        stock
    );
    prod.save();

    res.redirect('/');
};

exports.editProductPage = (req, res, next) => {
    const products = Product.findById(req.params.prodId);
    res.render('edit-product', {
        product: products[0],
        path: '/',
        pagetile: 'Edit Product',
        name: 'Nicolas',
    });
};

exports.editProductPost = (req, res, next) => {
    const updatedProduct = new Product(
        req.body.id,
        req.body.name,
        req.body.description,
        req.body.code,
        req.body.imageURL,
        req.body.price,
        req.body.stock
    );
    updatedProduct.update();
    // res.redirect('/');
    res.redirect('/products/' + updatedProduct.id);
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/');
};