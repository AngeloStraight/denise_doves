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
});

router.get('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
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
    console.log(cart.generateArray())
    res.render('shopping-cart', {js: 'shopping-cart.js', products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});
  });

  router.post('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    Bird.findById(productId, function(err, product){
      if (err){
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      res.redirect('/shopping-cart');
    });
  });

  router.post('/delete-from-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    Bird.findById(productId, function(err, product){
      if (err){
        return res.redirect('/');
      }
      cart.delete(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart.items);
      // const result = words.filter(word => word.length > 6);
      res.redirect('/shopping-cart');
    });
  });

module.exports = router;