const db = require("../database/models");

const controladorAdmin = {
    panel:(req,res)=>{
        res.render("panel");
    },
    crear:(req,res)=>{
        res.render("crear");
    },
    guardarCreado:(req,res)=>{
        //console.log(req.file);
        res.send(req.file)
    }
};

module.exports = controladorAdmin;