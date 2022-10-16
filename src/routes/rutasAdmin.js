const express = require("express");
const controladorAdmin = require("../controllers/adminController");
const validacionesCrear = require("../middlewares/validacionCrear");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const multerDiskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../../public/imagenes"));
    },
    filename:(req,file,cb)=>{
        const nombreImagen = "fotoProducto" + Date.now() + path.extname(file.originalname);
        cb(null,nombreImagen);
    }
});

const subirArchivo = multer({storage:multerDiskStorage});

router.get("/",controladorAdmin.panel);
router.get("/crear",controladorAdmin.crear);
router.get("/productos",controladorAdmin.listarProductos)
router.post("/crear",subirArchivo.single("foto"),validacionesCrear,controladorAdmin.guardarCreado);
router.get("/resultado",controladorAdmin.buscar);
router.get("/producto/:codigo",controladorAdmin.editar);
router.put("/producto/:codigo",subirArchivo.single("foto"),controladorAdmin.guardarEditado);
router.delete("/producto/:codigo",controladorAdmin.borrar);
router.get("/mensajes",controladorAdmin.verMensajes);
router.get("/mensaje/:id",controladorAdmin.detalleMensaje);
router.delete("/mensaje/:id",controladorAdmin.borrarMensaje);

router.get("/registrar",controladorAdmin.registrar);
router.post("/registrar",controladorAdmin.guardarRegistro);
router.get("/login",controladorAdmin.login);
router.post("/login",controladorAdmin.logueado);
module.exports = router;