const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const rutasCliente = require("./src/routes/clienteRouter");
const rutasAdmin = require("./src/routes/rutasAdmin");

require("dotenv").config();

app.use(express.static(path.join(__dirname,"./public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret:"el secreto",
    resave:false,
    saveUninitialized:false
}));

app.use("/",rutasCliente);
app.use("/admin",rutasAdmin);

app.set("view engine","ejs");
app.set("views",[path.join(__dirname,"/views"),
                path.join(__dirname,"/views/cliente"),
                path.join(__dirname,"/views/administrador")]);

app.listen(process.env.PORT || 3000,()=>{
    console.log("servidor corriendo");
});