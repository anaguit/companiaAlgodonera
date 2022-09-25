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

    const tamanios = sequelize.define(alias,cols,config);

    return tamanios;
};

module.exports = TamaniosData;