var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require('../config/sequelize.json')[env];
var db        = {} as any;

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//  var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// process.env.MYSQL_HOST,
// process.env.MYSQL_USER,
// process.env.MYSQL_PASSWORD,
// process.env.MYSQL_PORT,
// process.env.MYSQL_DATABASE
var sequelize = new Sequelize(
    process.env.MYSQL_DATABASE, // 데이터베이스 이름
    process.env.MYSQL_USER, // 유저 명
    process.env.MYSQL_PASSWORD, // 비밀번호
    {
        host: process.env.MYSQL_HOST, // 데이터베이스 호스트
        port: process.env.MYSQL_PORT,
        dialect: 'mysql', // 사용할 데이터베이스 종류
        logging: true,
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file: any) => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
