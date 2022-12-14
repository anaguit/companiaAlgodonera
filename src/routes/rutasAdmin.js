const express = require("express");
const controladorAdmin = require("../controllers/adminController");
const validacionesCrear = require("../middlewares/validacionCrear");
const autorizado = require("../middlewares/authMiddleware");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
    cloud_name: "du0n5tatb",
    api_key: "764874632665984",
    api_secret: "HJG0ruqLTdVyA458m8WNGEAsTbE",
  });
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV"
    }
});

const subirArchivo = multer({ storage: storage });

router.get("/prueba",(req,res)=>{res.render("vistaPrueba")});
router.post("/prueba",subirArchivo.single("prueba"),(req,res)=>{
    res.send(req.file.path); 
    console.log(req.file.filename);})
/*const multerDiskStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../../public/imagenes"));
    },
    filename:(req,file,cb)=>{
        const nombreImagen = "fotoProducto" + Date.now() + path.extname(file.originalname);
        cb(null,nombreImagen);
    }
});*/

//const subirArchivo = multer({storage:multerDiskStorage});

router.get("/",controladorAdmin.login);
router.post("/",controladorAdmin.logueado);
router.get("/panel",autorizado,controladorAdmin.panel);
router.get("/productos",autorizado,controladorAdmin.listarProductos)
router.get("/crear",autorizado,controladorAdmin.crear);
router.post("/crear",autorizado,subirArchivo.single("foto"),validacionesCrear,controladorAdmin.guardarCreado);
router.get("/resultado",autorizado,controladorAdmin.buscar);
router.get("/producto/:codigo",autorizado,controladorAdmin.editar);
//router.put("/producto/:codigo",autorizado,subirArchivo.single("foto"),controladorAdmin.guardarEditado);
router.delete("/producto/:codigo",autorizado,controladorAdmin.borrar);
router.get("/mensajes",autorizado,controladorAdmin.verMensajes);
router.get("/mensaje/:id",autorizado,controladorAdmin.detalleMensaje);
router.delete("/mensaje/:id",autorizado,controladorAdmin.borrarMensaje);

//router.get("/registrar",autorizado,controladorAdmin.registrar);
//router.post("/registrar",autorizado,controladorAdmin.guardarRegistro);

router.get("/detalle/:id",controladorAdmin.detalle);
module.exports = router;