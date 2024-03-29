const db = require("../database/models");
const Op = db.Sequelize.Op;
const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

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
            where:{codigo:req.params.id},
            include:[{association:"productoCategoria"},{association:"productoTamanio"}]
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
        db.Producto.findAll().then((resultado)=>{
            if(resultado.length == 0){
                const errores = validationResult(req);
                if(errores.isEmpty()){
                    db.Producto.create({
                        nombre:req.body.nombre,
                        modelo:req.body.modelo,
                        marca:req.body.marca,
                        descripcionCorta:req.body.descripcionCorta,
                        descripcion:req.body.descripcion,
                        precio:req.body.precio,
                        foto:req.file.filename,
                        destacado:req.body.destacado,
                        oferta:req.body.oferta,
                        codigo:req.body.codigo,
                        medidas:req.body.medidas,
                        path:req.file.path,
                        //public_id:req.file.,
                        //url:req.file.,
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
                    if(req.file != undefined){
                        cloudinary.uploader.destroy(req.file.filename)
                    }
                    const pedidoCategorias = db.Categorias.findAll();
                    const pedidoTamanios = db.Tamanios.findAll();
                    Promise.all([pedidoCategorias,pedidoTamanios])
                        .then(([categorias,tamanios])=>{
                            res.render("crear",{errores:errores.mapped(),categorias,tamanios,data:req.body});
                        });
                };
            }
            else{
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
                                descripcionCorta:req.body.descripcionCorta,
                                descripcion:req.body.descripcion,
                                precio:req.body.precio,
                                foto:req.file.filename,
                                destacado:req.body.destacado,
                                oferta:req.body.oferta,
                                codigo:req.body.codigo,
                                medidas:req.body.medidas,
                                path:req.file.path,
                                //public_id:req.file.,
                                //url:req.file.,
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
                            if(req.file != undefined){
                                cloudinary.uploader.destroy(req.file.filename)
                            }
                            const pedidoCategorias = db.Categorias.findAll();
                            const pedidoTamanios = db.Tamanios.findAll();
                            Promise.all([pedidoCategorias,pedidoTamanios])
                                .then(([categorias,tamanios])=>{
                                    res.render("crear",{errores:errores.mapped(),categorias,tamanios,data:req.body});
                                });
                        };
                    }
                    else{
                        if(req.file != undefined){
                            cloudinary.uploader.destroy(req.file.filename)
                        }
                        res.render("productoExistente");
                    };
                });
            };
        });
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
                descripcionCorta:req.body.descripcionCorta,
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
                cloudinary.uploader.destroy(productoEncontrado.foto)
                db.Producto.update({
                    nombre:req.body.nombre,
                    modelo:req.body.modelo,
                    marca:req.body.marca,
                    descripcionCorta:req.body.descripcionCorta,
                    descripcion:req.body.descripcion,
                    precio:req.body.precio,
                    foto:req.file.filename,
                    destacado:req.body.destacado,
                    oferta:req.body.oferta,
                    codigo:req.body.codigo,
                    medidas:req.body.medidas,
                    path:req.file.path,
                    //public_id:req.file.,
                    //url:req.file.,
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
            where:{codigo:req.query.codigo},
            include:[{association:"productoCategoria"},{association:'productoTamanio'}]
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
            cloudinary.uploader.destroy(productoEncontrado.foto)
           db.Producto.destroy({
            where:{codigo:req.params.codigo}
            })
            .then((producto)=>{
                res.render("borradoExitoso")
            })
        })
    },
    verMensajes:(req,res)=>{
        db.Mensaje.findAll()
            .then((mensajes)=>{
                if(mensajes.length !== 0){
                    res.render("mensajes",{mensajes})
                }
                    else{
                        res.render("noHaymensajes");
                    };
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
    /*registrar:(req,res)=>{
        res.render("registrar");
    },*/
    /*guardarRegistro:(req,res)=>{
        db.Administrador.create({
            nombre:req.body.email,
            contrasenia:bcrypt.hashSync(req.body.contrasenia,10)
        }).then((administrador)=>{
            res.send(administrador)
        });
    },*/
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