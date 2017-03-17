'use strict';

module.exports = function Job(sequelize, DataTypes) {
    return sequelize.define('Job', {
        job_id: {
            type: DataTypes.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        job_name: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        rate: DataTypes.INTEGER
    },{
        tableName: 'job'
    });
};