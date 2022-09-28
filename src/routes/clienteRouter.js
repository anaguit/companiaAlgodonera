const express = require("express");
const router = express.Router();
const validacionContacto = require("../middlewares/validacionContacto");
const controladorCliente = require("../controllers/clienteController");

router.get("/",controladorCliente.inicio);
router.get("/producto/:codigo",controladorCliente.detalle);
router.get("/contacto",controladorCliente.contactar);
router.post("/contacto",validacionContacto,controladorCliente.enviarMensaje);

module.exports = router;