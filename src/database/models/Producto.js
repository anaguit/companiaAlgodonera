function productoData(sequelize,Datatypes){
    const alias = "Producto";

    const cols = {
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        tipo:{
            type:Datatypes.STRING(50),
            allowNull:false
        },
        marca:{
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
        }
    };

    const config = {
        timestamps:false,
        tableName:"producto"
    };

    const producto = sequelize.define(alias,cols,config);

    return producto;
};

module.exports = productoData;