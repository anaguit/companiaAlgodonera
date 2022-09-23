const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const rutasCliente = require("./src/routes/clienteRouter");

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use("/",rutasCliente);
app.set("view engine","ejs");
app.set("views",[path.join(__dirname,"/views"),
                path.join(__dirname,"/views/cliente"),
                path.join(__dirname,"/views/administrador")]);

app.listen(3000,()=>{
    console.log("servidor corriendo");
});

app.get("/",(req,res)=>{
    res.render("contactanos");
});