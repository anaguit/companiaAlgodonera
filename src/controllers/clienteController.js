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
    contactar:(req,res)=>{
        res.render("contactanos");
    },
    enviarMensaje:(req,res)=>{
        db.Mensaje.create({
            nombre:req.body.nombre,
            mail:req.body.mail,
            asunto:req.body.asunto,
            texto:req.body.mensaje
        }).then((resultado)=>{
            res.send(req.body);
            })
        //res.send(req.body)
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