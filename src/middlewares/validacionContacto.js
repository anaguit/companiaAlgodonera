const {body} = require("express-validator");

const validacionContacto = [
    body("nombre").notEmpty().withMessage("campo obligatorio"),
    body("mail").notEmpty().withMessage("campo obligatorio"),
    body("asunto").notEmpty().withMessage("indique un asunto"),
    body("mensaje").notEmpty().withMessage("campo obligatorio")
];

module.exports = validacionContacto;