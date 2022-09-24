const express = require("express");
const controladorAdmin = require("../controllers/adminController");
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
router.post("/crear",subirArchivo.single("foto"),controladorAdmin.guardarCreado);

module.exports = router