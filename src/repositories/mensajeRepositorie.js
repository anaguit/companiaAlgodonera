const db = require("../database/models");

const mensajeRepositorio = {
    crear: db.Mensaje.create()
};

module.exports = mensajeRepositorio
