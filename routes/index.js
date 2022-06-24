var express = require('express');
var router = express.Router();

var Bird = require('../models/birds')
var Cart = require('../models/cart');

router.get('/', function(req, res, next){
    Bird.find(function(err, docs){
        var birdChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize){
            birdChunks.push(docs.slice(i, i + chunkSize));
        }
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        res.render('index', { style: 'index.css', birds: birdChunks, totalQty: cart.totalQty});
    });
    // res.render('index', { style: 'index.css', });
});

router.get('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    console.log(typeof productId);
    Bird.findById(productId, function(err, product){
      if (err){
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      res.redirect('/');
    });
  });

  router.get('/shopping-cart', function(req, res, next){
    if (!req.session.cart){
      return res.render('shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
  });

module.exports = router;