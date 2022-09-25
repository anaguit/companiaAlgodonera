function TamaniosData(sequelize,Datatypes){

    const alias = "Tamanios";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        tamanio:{
            type:Datatypes.STRING(50),
            allowNull:false
        }
    };

    const config = {
        tableName:"tamanios",
        timestamps:false
    };

    const Tamanios = sequelize.define(alias,cols,config);

    Tamanios.associate = function(modelos){
        Tamanios.hasMany(modelos.Producto,{
            as:"tamanioProducto",
            foreignKey:"idTamanios"
        })
    }

    return Tamanios;
};

module.exports = TamaniosData;