function mensajeData(sequelize,Datatypes){
    const alias = "Mensaje";

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
        telefono:{
            type:Datatypes.STRING(50),
            allowNull:true
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
        tableName:"mensajes"
    };

    const Mensaje = sequelize.define(alias,cols,config);

    return Mensaje;
};

module.exports = mensajeData;