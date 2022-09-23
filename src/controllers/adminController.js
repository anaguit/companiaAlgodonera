db = require("../database/models");

const controladorAdmin = {
    panel:(req,res)=>{
        res.render("panel");
    },
    crear:(req,res)=>{
        res.render("crear");
    }
};

module.exports = controladorAdmin;