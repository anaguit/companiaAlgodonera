const db = require("../database/models");
const Op = db.Sequelize.Op;

const controladorAdmin = {
    panel:(req,res)=>{
        res.render("panel");
    },
    crear:(req,res)=>{
        db.Categorias.findAll()
        .then((categorias)=>{
            db.Tamanios.findAll()
            .then((tamanios)=>{
                res.render("crear",{categorias,tamanios});       
            });
        });
    },
    guardarCreado:(req,res)=>{
        db.Producto.create({
            tipo:req.body.tipo,
            marca:req.body.marca,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            foto:req.file.path,
            destacado:req.body.destacado,
            oferta:req.body.oferta,
            codigo:req.body.codigo
        }).then((resultado)=>{
            res.render("creadoExitoso");
        })
    },
    buscar:(req,res)=>{
        db.Producto.findOne({
            where:{codigo:req.query.codigo}
        }).then((producto)=>{
            if(producto != null){
                res.render("encontrado",{producto})
            }
                else{
                    res.render("noEncontrado")
                }
        })
    }
};

module.exports = controladorAdmin;