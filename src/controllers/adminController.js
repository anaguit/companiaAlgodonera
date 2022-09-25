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
            nombre:req.body.nombre,
            modelo:req.body.modelo,
            marca:req.body.marca,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            foto:req.file.path,
            destacado:req.body.destacado,
            oferta:req.body.oferta,
            codigo:req.body.codigo,
            medidas:req.body.medidas,
            idTamanios:req.body.tamanio,
            idCategorias:req.body.categoria
        }).then((resultado)=>{
            res.render("creadoExitoso");
        })
    },
    buscar:(req,res)=>{
        db.Producto.findOne({
            where:{codigo:req.query.codigo}
        }).then((producto)=>{
            if(producto != null){
                res.render("detalle",{producto})
            }
                else{
                    res.render("noEncontrado")
                }
        })
    },
    borrar:(req,res)=>{
        db.Producto.destroy({
            where:{codigo:req.params.id}
        })
        .then((producto)=>{
            console.log(producto)
            res.render("borradoExitoso")
        })
    }
};

module.exports = controladorAdmin;