const autorizado = (req,res,next)=>{
    if(req.session.logueado !== undefined){
        next();
    }
        else{
            res.send("acceso denegado");
        };
};

module.exports = autorizado