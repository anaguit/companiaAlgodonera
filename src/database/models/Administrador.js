function AdministradorData(sequelize,Datatypes){
    const alias = "administrador";

    const cols = {
        id:{
            type:Datatypes.Integer,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        nombre:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        contrasenia:{
            type:Datatypes.STRING(200),
            allowNull:false
        }
    };

    const config = {
        timestamps:false,
        tableName:"administrador"
    };

    const administrador = sequelize.define(alias,cols,config);

    return administrador
};

module.exports = AdministradorData;