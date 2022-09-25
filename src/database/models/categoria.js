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

    const categorias = sequelize.define(alias,cols,config);

    return categorias;
};

module.exports = CategoriasData;