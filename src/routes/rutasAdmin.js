const express = require("express");
const controladorAdmin = require("../controllers/adminController");
const router = express.Router();

router.get("/",controladorAdmin.panel);
router.get("/crear",controladorAdmin.crear);

module.exports = router