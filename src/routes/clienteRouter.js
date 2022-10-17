const express = require("express");
const router = express.Router();
const validacionContacto = require("../middlewares/validacionContacto");
const controladorCliente = require("../controllers/clienteController");

router.get("/",controladorCliente.inicio);
router.get("/productos",controladorCliente.listado);
router.get("/producto/:codigo",controladorCliente.detalle);
router.get("/contacto",controladorCliente.contactar);
router.post("/contacto",validacionContacto,controladorCliente.enviarMensaje);
router.get("/buscar/categoria",controladorCliente.buscarCategoria);
router.get("/buscar/tamanio",controladorCliente.buscarTamanio);

module.exports = router;