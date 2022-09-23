const express = require("express");
const router = express.Router();
const controladorCliente = require("../controllers/clienteController");

router.get("/",controladorCliente.inicio);
router.get("/contacto",controladorCliente.contactar);
router.post("/contacto",controladorCliente.enviarMensaje);

module.exports = router;