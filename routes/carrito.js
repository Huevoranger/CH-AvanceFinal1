const { application } = require("express");
const express = require("express");
const handlebars= require("express-handlebars")

//Inicialización a router
const { Router } = express;
const carrito = new Router();

carrito.get("/",(req, res)=>{
    res.send("carrito")
})

module.exports = carrito;