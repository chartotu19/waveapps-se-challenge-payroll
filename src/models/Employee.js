'use strict';

module.exports = function Employee(sequelize, DataTypes){
    return sequelize.define('employee', {
        employee_id: {
            type: DataTypes.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        }
    },{
        tableName: 'employee'
    });
};