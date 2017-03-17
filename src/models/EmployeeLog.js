'use strict';

module.exports = function (sequelize, DataTypes) {
    let EmployeeLog = sequelize.define('EmployeeLog', {
        log_date: DataTypes.STRING,
        hours : DataTypes.FLOAT,
        job_name:{
            type : DataTypes.STRING,
        },
        report_number: DataTypes.STRING
    },{
        tableName: 'employee_log',
        classMethods: {
            associate : (models)=> {
                EmployeeLog.belongsTo(models.Employee,{
                    foreignKey: 'employee_id'
                });
    
                //@TODO : wasn't able to create and foreignKey association. ORM was failing to insert into employee_log
                //EmployeeLog.belongsTo(models.Job,{
                //    foreignKey: 'job_name'
                //})
            },
        }
    });
    return EmployeeLog;
};