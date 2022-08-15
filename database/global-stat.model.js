const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        // 모델 이름
        'GlobalStat',
        // 속성 목록 (컬럼에 해당)
        {
            id: { // ID
                autoIncrement: true,
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true
            },
            cc: { // 국가코드
                type: DataTypes.CHAR(2),
                allowNull: false
            },
            date: { // 날짜
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            confirmed: { // 확진자 수
                type: DataTypes.INTEGER,
                allowNull: false
            },
            death: { // 사망자 수
                type: DataTypes.INTEGER,
                allowNull: true
            },
            released: { // 완치자 수
                type: DataTypes.INTEGER,
                allowNull: true
            },
            tested: { // 총 검사자 수
                type: DataTypes.INTEGER,
                allowNull: true
            },
            testing: { // 총 검사자 수
                type: DataTypes.INTEGER,
                allowNull: true
            },
            negative: { // 결과 음성 수
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        // 추가 옵션
        {
            sequelize,
            tableName: 'GlobalStat',
            indexs: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    fields: [{name: 'cc'}, {name: 'date'}]
                }
            ],
            timestamps: false
        }
    );
}