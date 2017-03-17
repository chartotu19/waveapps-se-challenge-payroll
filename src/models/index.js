'use strict';

let config = {
    database: process.env.SE_DATABASE || 'se_payroll',
    username: process.env.SE_USERNAME || 'root',
    password: process.env.SE_PASSWORD || ''
};

let Sequelize = require('sequelize');

let db = {
    sequelize: new Sequelize(
        config.database,
        config.username,
        config.password
    )
};

db.Employee = db.sequelize.import('./Employee');
db.Job = db.sequelize.import('./Job');
db.EmployeeLog = db.sequelize.import('./EmployeeLog');

Object.keys(db).forEach(function(modelName) {
    //console.log(modelName,db[modelName]);
    if (modelName != 'sequelize' && 'associate' in db[modelName]) {
        
        db[modelName].associate(db);
    }
});
/*
*   Initializing Database.
* */
db.sequelize.sync()
    .then(function () {
        return db.sequelize.query("alter table employee_log add unique `unique_indexx` (report_number,employee_id,job_name,log_date)")
    })
    .then(function ( ) {
        return db.sequelize.query("insert into job (job_name,rate) values ('A',20)")
    }).then(function (  ) {
        return db.sequelize.query("insert into job (job_name,rate) values ('B',30)")
    })
    .catch(function (err) {
        console.warn(err.message);
    });

module.exports = db;
