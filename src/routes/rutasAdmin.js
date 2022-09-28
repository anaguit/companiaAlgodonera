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

module.exports = router;