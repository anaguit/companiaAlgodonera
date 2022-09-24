const db = require("../database/models");

const controladorAdmin = {
    panel:(req,res)=>{
        res.render("panel");
    },
    crear:(req,res)=>{
        res.render("crear");
    },
    guardarCreado:(req,res)=>{
        db.Producto.create({
            tipo:req.body.tipo,
            marca:req.body.marca,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            foto:req.file.path,
            destacado:req.body.destacado,
            oferta:req.body.oferta
        }).then((resultado)=>{
            res.render("creadoExitoso");
        })
    }
};

module.exports = controladorAdmin;