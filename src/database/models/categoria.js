function CategoriasData(sequelize,Datatypes){
    const alias = "Categorias";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:Datatypes.STRING(50),
            allowNull:false
        }
    };

    const config = {
        tableName:"categorias",
        timestamps:false
    };

    const Categorias = sequelize.define(alias,cols,config);

    Categorias.associate = function(modelos){
        Categorias.hasMany(modelos.Producto,{
            as:"categoriaProducto",
            foreignKey:"idCategoria"
        });
    };
    
    return Categorias;
};

module.exports = CategoriasData;