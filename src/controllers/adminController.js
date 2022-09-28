const db = require("../database/models");
const Op = db.Sequelize.Op;
const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");

const controladorAdmin = {
    panel:(req,res)=>{
        res.render("panel");
    },
    listarProductos:(req,res)=>{
        db.Producto.findAll()
            .then((productos)=>{
                res.render("listaProductos",{productos});
            });

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
        const errores = validationResult(req);
        if(errores.isEmpty()){
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
        }
        else{
            const pedidoCategorias = db.Categorias.findAll();
            const pedidoTamanios = db.Tamanios.findAll();
            Promise.all([pedidoCategorias,pedidoTamanios])
                .then(([categorias,tamanios])=>{
                    //res.send(errores.mapped())
                    console.log(req.body)
                    res.render("crear",{errores:errores.mapped(),categorias,tamanios,data:req.body});
                });
        };
    },
    editar:(req,res)=>{
        const pedidoCategorias = db.Categorias.findAll();
        const pedidoTamanios = db.Tamanios.findAll();
        db.Producto.findOne({
            where:{codigo:req.params.codigo}
        })
        .then((producto)=>{
            Promise.all([pedidoCategorias,pedidoTamanios])
            .then(([categorias,tamanios])=>{
                res.render("editar",{producto,categorias,tamanios});
            });
        });
    },
    guardarEditado:(req,res)=>{
        db.Producto.update({
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
            },{
                where:{codigo:req.params.codigo}
            })
            .then((productoEditado)=>{
                res.render("editadoExitoso");
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
        db.Producto.findOne({
            where:{codigo:req.params.codigo}
        })
        .then((productoEncontrado)=>{
           fs.unlinkSync(productoEncontrado.foto);
           db.Producto.destroy({
            where:{codigo:req.params.codigo}
        })
        .then((producto)=>{
            res.render("borradoExitoso")
        })
        })
        /*db.Producto.destroy({
            where:{codigo:req.params.codigo}
        })
        .then((producto)=>{
            console.log(producto)
            res.render("borradoExitoso")
        })*/
    }
};

module.exports = controladorAdmin;