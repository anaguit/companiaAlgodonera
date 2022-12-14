function productoData(sequelize,Datatypes){
    const alias = "Producto";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        nombre:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        modelo:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        marca:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        descripcionCorta:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        descripcion:{
            type:Datatypes.STRING(500),
            allowNull:false
        },
        precio:{
            type:Datatypes.STRING(20),
            allowNull:true
        },
        foto:{
            type:Datatypes.STRING(500),
            allowNull:false
        },
        destacado:{
            type:Datatypes.STRING(20),
            allowNull:true
        },
        oferta:{
            type:Datatypes.STRING(20),
            allowNull:true
        },
        codigo:{
            type:Datatypes.STRING(100),
            allowNull:false
        },
        medidas:{
            type:Datatypes.STRING(50),
            allowNull:true
        },
        path:{
            type:Datatypes.STRING(150)
        }
    };

    const config = {
        timestamps:false,
        tableName:"productos"
    };

    const Producto = sequelize.define(alias,cols,config);

    Producto.associate = function(modelos){
        Producto.belongsTo(modelos.Tamanios,{
            as:'productoTamanio',
            foreignKey:"idTamanios"
        }),
        Producto.belongsTo(modelos.Categorias,{
            as:"productoCategoria",
            foreignKey:"idCategorias"
        });
    };

    /*Producto.associate = function(modelos){
        Producto.belongsTo(modelos.Categorias,{
            as:"productoCategoria",
            foreignKey:"idCategorias"
        });
    };*/

    return Producto;
};

module.exports = productoData;