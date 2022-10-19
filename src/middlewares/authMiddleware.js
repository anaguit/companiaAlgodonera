const autorizado = (req,res,next)=>{
    if(req.session.logueado !== undefined){
        next();
    }
        else{
            res.redirect("/admin");
        };
};

module.exports = autorizado