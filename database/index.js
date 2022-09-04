const Sequelize = require('sequelize');

const config = {
    host: process.env.CORONABOARD_MYSQL_HOST || '127.0.0.1',
    port: 3306,
    database: 'coronaboard',
    user: 'coronaboard_admin',
    password: process.env.CORONABOARD_MYSQL_HOST || '1234'
};

const sequelize = new Sequelize(config.database,
                                config.user,
                                config.password,
                                {
                                    host: config.host,
                                    dialect: 'mysql'
                                });

// ~~~.model.js에서 만든 객체 모델을 외부에서 사용할 수 있도록 module.exports에 추가
module.exports = {
    sequelize,
    GlobalStat: require('./global-stat.model')(sequelize),
    KeyValue: require('./key-value.model')(sequelize)
}