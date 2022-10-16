const autorizado = (req,res,next)=>{
    if(req.session.logueado !== undefined){
        next();
    }
        else{
            res.redirect("/");
        };
};

module.exports = autorizado