const { validationResult } = require("express-validator");
const db = require("../database/models");

const controladorCliente = {
    inicio:(req,res)=>{
        const enDestacados = db.Producto.findAll({
            where:{destacado:"si"}
        });
        const enOfertas = db.Producto.findAll({
            where:{oferta:"si"}
        });
        Promise.all([enDestacados,enOfertas])
        .then(([destacados,ofertas])=>{
            res.render("inicio",{destacados,ofertas});
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
            //include:[{association:"productoCategoria"}]
        })
        .then((producto)=>{
            res.render("detalleCliente",{producto})
        })
    }
};

module.exports = controladorCliente;