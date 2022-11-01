const db = require("../database/models");
const Op = db.Sequelize.Op;
const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

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
    detalle:(req,res)=>{
        db.Producto.findOne({
            where:{codigo:req.params.id}
        })
        .then((producto)=>{
            res.render("detalle",{producto});
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
        db.Producto.findOne({
            where:{codigo:req.body.codigo}
        }).then((productoExistente)=>{
            if(productoExistente == undefined){
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
                        db.Producto.findOne({
                            where:{codigo:req.body.codigo}
                        })
                        .then((productoEncontrado)=>{
                            res.render("creadoExitoso",{productoEncontrado});
                        })
                    })
                }
                else{
                    fs.unlinkSync(req.file.path);
                    
                    const pedidoCategorias = db.Categorias.findAll();
                    const pedidoTamanios = db.Tamanios.findAll();
                    Promise.all([pedidoCategorias,pedidoTamanios])
                        .then(([categorias,tamanios])=>{
                            //res.send(errores.mapped())
                            console.log(req.body)
                            res.render("crear",{errores:errores.mapped(),categorias,tamanios,data:req.body});
                        });
                };
            }
            else{
                res.render("productoExistente")
            };
        });
        /*const errores = validationResult(req);
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
                db.Producto.findOne({
                    where:{codigo:req.body.codigo}
                })
                .then((productoEncontrado)=>{
                    res.render("creadoExitoso",{productoEncontrado});
                })
            })
        }
        else{
            fs.unlinkSync(req.file.path);
            
            const pedidoCategorias = db.Categorias.findAll();
            const pedidoTamanios = db.Tamanios.findAll();
            Promise.all([pedidoCategorias,pedidoTamanios])
                .then(([categorias,tamanios])=>{
                    //res.send(errores.mapped())
                    console.log(req.body)
                    res.render("crear",{errores:errores.mapped(),categorias,tamanios,data:req.body});
                });
        };*/
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
        if(req.file == undefined){
            db.Producto.update({
                nombre:req.body.nombre,
                modelo:req.body.modelo,
                marca:req.body.marca,
                descripcion:req.body.descripcion,
                precio:req.body.precio,
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
            });
        }
        else{
            db.Producto.findOne({
                where:{codigo:req.params.codigo}
            })
            .then((productoEncontrado)=>{
                fs.unlinkSync(productoEncontrado.foto);
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
                });
            });
        };
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
    },
    verMensajes:(req,res)=>{
        db.Mensaje.findAll()
            .then((mensajes)=>{
                res.render("mensajes",{mensajes})
            });
    },
    detalleMensaje:(req,res)=>{
        db.Mensaje.findOne({
            where:{id:req.params.id}
        })
        .then((mensaje)=>{
            res.render("detalleMensaje",{mensaje})
        });
    },
    borrarMensaje:(req,res)=>{
        db.Mensaje.destroy({
            where:{id:req.params.id}
        })
        .then((mensaje)=>{
            res.render("mensajeBorrado",{mensaje});
        });
    },
    registrar:(req,res)=>{
        res.render("registrar");
    },
    guardarRegistro:(req,res)=>{
        db.Administrador.create({
            nombre:req.body.email,
            contrasenia:bcrypt.hashSync(req.body.contrasenia,10)
        }).then((administrador)=>{
            res.send(administrador)
        });
    },
    login:(req,res)=>{
        res.render("loguear")
    },
    logueado:(req,res)=>{
        db.Administrador.findOne({
            where:{nombre:req.body.email}
        }).then((administrador)=>{
            if(administrador && bcrypt.compareSync(req.body.contrasenia,administrador.contrasenia)){
                req.session.logueado = administrador
                res.redirect("/admin/panel")
            }
                else{
                    let error = "credenciales invalidas"
                    res.render("loguear",{error});
                };
        });
    }
};
module.exports = controladorAdmin;