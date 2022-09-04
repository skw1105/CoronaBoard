const {DataTypes} = require('sequelize');
// 객체 모델 정의
module.exports = (sequelize) => {
    return sequelize.define(
        'KeyValue', //모델 이름
        { //속성 목록
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        { //추가옵션
            sequelize,
            tableName: 'KeyValue',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{ name: 'id' }]
                },
                {
                    name: 'key',
                    unique: true,
                    fields: [{ name: 'key' }]
                }
            ]
        }
    );
};