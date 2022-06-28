var Bird = require('../models/birds');
var mongoose = require('mongoose');
// const dotenv = require('dotenv')
require('dotenv').config({ path: './.env'});

const connectDB = require('../config/db');
connectDB()

var birds = [
    new Bird({
        name:"Dove_1",
        sex:"male",
        age:1,
        price:1,
        price_id: "price_1LEFunGvrFCFNDycCtjQunEh",
        image: "/images/bird_on_tree.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove_2",
        sex:"female",
        age:3,
        price:1,
        price_id: "price_1LEFwiGvrFCFNDycEIyRn7cz",
        image: "/images/dove.jpg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove_3",
        sex:"male",
        age:10,
        price:1,
        price_id: "price_1LEG0yGvrFCFNDyczSOhuIcE",
        image: "/images/dove_mountain.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove_4",
        sex:"male",
        age:1,
        price:1,
        price_id: "price_1LEG4AGvrFCFNDycr7MGlMha",
        image: "/images/dove_on_cement.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove_5",
        sex:"female",
        age:3,
        price:1,
        price_id: "price_1LEG2dGvrFCFNDyce74CfuPj",
        image: "/images/dove_on_wood.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove_6",
        sex:"male",
        age:10,
        price:1,
        price_id: "price_1LEG5sGvrFCFNDycVzB8Y0wk",
        image: "/images/dove_in_tree.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove_7",
        sex:"male",
        age:10,
        price:1,
        price_id: "price_1LEG6UGvrFCFNDycUjlN6xqz",
        image: "/images/white_bird.jpeg",
        createdAt: Date.now()
    }),
];

var done = 0;
for (var i = 0; i < birds.length; ++i){
    birds[i].save(function(err, result){
        done++;
        if (done === birds.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect()
}
