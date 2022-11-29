const {body} = require("express-validator");

const validacionesCrear = [
    body("codigo").notEmpty().withMessage("Campo obligatorio"),
    body("nombre").notEmpty().withMessage("Campo obligatorio"),
    body("modelo").notEmpty().withMessage("Campo obligatorio"),
    body("marca").notEmpty().withMessage("Campo obligatorio"),
    body("descripcion").notEmpty().withMessage("Campo obligatorio"),
    body("descripcionCorta").notEmpty().withMessage("Campo obligatorio"),
    body("medidas").notEmpty().withMessage("Campo obligatorio"),
    body("categoria").notEmpty().withMessage("Campo obligatorio"),
    body("tamanio").notEmpty().withMessage("Campo obligatorio"),
    body("destacado").notEmpty().withMessage("Campo obligatorio"),
    body("oferta").notEmpty().withMessage("Campo obligatorio"),
    body("foto").custom((value,{req}) => {
        const file = req.file;
        if(!file){
            throw new Error("Adjuntar imagen")
        };
        return true;
    })
];

module.exports = validacionesCrear;