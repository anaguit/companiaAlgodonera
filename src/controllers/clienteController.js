const { validationResult } = require("express-validator");
const db = require("../database/models");

const controladorCliente = {
    inicio:(req,res)=>{
        const categorias = db.Categorias.findAll();
        const tamanios = db.Tamanios.findAll();
        const enDestacados = db.Producto.findAll({
            where:{destacado:"si"}
        });
        const enOfertas = db.Producto.findAll({
            where:{oferta:"si"}
        });
        Promise.all([categorias,tamanios,enDestacados,enOfertas])
        .then(([categorias,tamanios,destacados,ofertas])=>{
            res.render("inicio",{categorias,tamanios,destacados,ofertas});
        });
    },
    listado:(req,res)=>{
        const categSabanas = db.Producto.findAll({
            where:{idCategorias:1}
        });
        const categFundas = db.Producto.findAll({
            where:{idCategorias:2}
        });
        const categAcolchados = db.Producto.findAll({
            where:{idCategorias:3}
        });
        Promise.all([categSabanas,categFundas,categAcolchados])
            .then(([sabanas,fundas,acolchados])=>{
                res.render("listado",{sabanas,acolchados,fundas})
            });
    },
    contactar:(req,res)=>{
        res.render("contactanos");
    },
    enviarMensaje:(req,res)=>{
        const errores = validationResult(req);
        
        if(errores.isEmpty()){
            db.Mensaje.create({
                nombre:req.body.nombre,
                mail:req.body.mail,
                asunto:req.body.asunto,
                texto:req.body.mensaje
            }).then((persona)=>{
                res.render("mensajeEnviado",{persona});
                })
        }
            else{
                res.render("contactanos",{errores:errores.mapped(),data:req.body});
            }
    },
    detalle:(req,res)=>{
        db.Producto.findOne({
            where:{codigo:req.params.codigo},
            include:[{association:"productoCategoria"}/*,{association:"productoTamanio"}*/]
        })
        .then((producto)=>{
            //res.send(producto)
            res.render("detalleCliente",{producto})
        })
    },
    buscarCategoria:(req,res)=>{
        db.Producto.findAll({
            where:{idCategorias:req.query.categoria}
        }).then((productos)=>{
            if(productos.length != 0){
                res.render("resultadoCategoria",{productos});
            }
            else{
                res.render("noEncontradoCliente")
            }
        });
    },
    buscarTamanio:(req,res)=>{
        db.Producto.findAll({
            where:{idTamanios:req.query.tamanio}
        }).then((productos)=>{
            if(productos.length != 0){
                res.render("resultadoTamanio",{productos});
            }
            else{
                res.render("noEncontradoCliente");
            }
        });
    }
};

module.exports = controladorCliente;