const express = require("express");
const controladorAdmin = require("../controllers/adminController");
const validacionesCrear = require("../middlewares/validacionCrear");
const autorizado = require("../middlewares/authMiddleware");
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

router.get("/",controladorAdmin.login);
router.post("/",controladorAdmin.logueado);
router.get("/panel",autorizado,controladorAdmin.panel);
router.get("/crear",autorizado,controladorAdmin.crear);
router.get("/productos",autorizado,controladorAdmin.listarProductos)
router.post("/crear",autorizado,subirArchivo.single("foto"),validacionesCrear,controladorAdmin.guardarCreado);
router.get("/resultado",autorizado,controladorAdmin.buscar);
router.get("/producto/:codigo",autorizado,controladorAdmin.editar);
router.put("/producto/:codigo",autorizado,subirArchivo.single("foto"),controladorAdmin.guardarEditado);
router.delete("/producto/:codigo",autorizado,controladorAdmin.borrar);
router.get("/mensajes",autorizado,controladorAdmin.verMensajes);
router.get("/mensaje/:id",autorizado,controladorAdmin.detalleMensaje);
router.delete("/mensaje/:id",autorizado,controladorAdmin.borrarMensaje);

router.get("/registrar",autorizado,controladorAdmin.registrar);
router.post("/registrar",autorizado,controladorAdmin.guardarRegistro);

module.exports = router;