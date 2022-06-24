var Bird = require('../models/birds');
var mongoose = require('mongoose');
// const dotenv = require('dotenv')
require('dotenv').config({ path: './.env'});

const connectDB = require('../config/db');
connectDB()

var birds = [
    new Bird({
        name:"Dove",
        sex:"male",
        age:1,
        price:150,
        image: "/images/bird_on_tree.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove",
        sex:"female",
        age:3,
        price:150,
        image: "/images/dove.jpg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove",
        sex:"male",
        age:10,
        price:150,
        image: "/images/dove_mountain.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove",
        sex:"male",
        age:1,
        price:150,
        image: "/images/dove_on_cement.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove",
        sex:"female",
        age:3,
        price:150,
        image: "/images/dove_on_wood.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove",
        sex:"male",
        age:10,
        price:150,
        image: "/images/dove_in_tree.jpeg",
        createdAt: Date.now()
    }),
    new Bird({
        name:"Dove",
        sex:"male",
        age:10,
        price:150,
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
