require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.BD_LOCAL_PASSWORD,
    "database": "companiaalgodonera",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port":process.env.DB_PORT,
    "dialect": "mysql",
    "dialectOptions":{
      "ssl":{
        "require":true,
        "rejectUnauthorized":false
      }
    }
  }
}
