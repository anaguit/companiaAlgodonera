function mensajeData(sequelize,Datatypes){
    const alias = "mensaje";

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
        mail:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        asunto:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        texto:{
            type:Datatypes.STRING(500),
            allowNull:false
        }
    };

    const config = {
        timestamps:false,
        tableName:"mensaje"
    };

    const mensaje = sequelize.define(alias,cols,config);

    return mensaje;
};

module.exports = mensajeData;