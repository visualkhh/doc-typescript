module.exports = function (sequelize: any, DataTypes: any) {
    const user = sequelize.define('user', {
        userSeq: { field: 'USER_SEQ', type: DataTypes.INTEGER, primaryKey: true, unique: true, allowNull: false, autoIncrement: true },
        cponJd: { field: 'CPON_ID', type: DataTypes.STRING(30), allowNull: false },
    }, {
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
        timestamps: false,
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'T_USER'
    });

    return user;
};

/*
 Sequelize 참고
 //https://jongmin92.github.io/2017/04/08/Node/sequelize/#sequelize-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0
 //http://docs.sequelizejs.com/manual/installation/getting-started
 DataTypes => http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes
 Associations => http://docs.sequelizejs.com/en/v3/api/associations/
 Model Function => http://docs.sequelizejs.com/en/v3/api/model/
 */