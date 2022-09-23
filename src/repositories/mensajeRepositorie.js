const db = require("../database/models");

const mensajeRepositorio = {
    crear: db.Mensaje.create({
        nombre:req.body.nombre,
        mail:req.body.mail,
        asunto:req.body.asunto,
        texto:req.body.mensaje
    })
};

module.exports = mensajeRepositorio
