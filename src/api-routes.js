import Express from 'express';
import {sessionAuthenticate} from './auth-middleware';
import multer from 'multer';
import BadRequestError from './errors/BadRequestError';
import csv from 'csv';
import fs from 'fs';
import db from './models/index';

let router = Express.Router([]);
let upload = multer({dest: 'uploads/'});


router.post('/login', function ( req, res, next ) {
    req.session.email = req.body.email;
    let k = req.session.save();
    return res.json({
        message: 'success'
    })
});

router.post('/upload', sessionAuthenticate, upload.single('timesheet'), function ( req, res, next ) {
    if (!req.file.path) {
        return next(new BadRequestError('no file present'));
    }
    let data = fs.readFileSync(req.file.path, 'utf-8');
    csv.parse(data, function ( err, parsedData ) {
        
        let promises = [];
        let header = parsedData.shift();
        let report_meta_data = parsedData.pop();
        console.log(report_meta_data);
        if (report_meta_data[0] != 'report id' || typeof report_meta_data[1] != 'string') {
            return next(new BadRequestError('incorrect report number'));
        }
        
        db.EmployeeLog.findAll({
            where : {report_number: report_meta_data[1]}
        })
        .then(function ( result ) {
            if(result.length > 0){
                return next(new BadRequestError('report number already exists!'));
            }

            parsedData.forEach(( data ) => {
                promises.push(
                    db.Employee.findOrCreate({
                        where: {employee_id: parseInt(data[2])}
                    })
                );
                promises.push(
                    db.Job.findOrCreate({
                        where: {
                            job_name: data[3]
                        }
                    })
                );
            });

            return Promise.all(promises)
                .then(function ( data ) {
                    let promises = [];
                    parsedData.forEach(function ( data ) {
                        promises.push(db.EmployeeLog.findOrCreate({
                            where: {
                                report_number: report_meta_data[1],
                                log_date: data[0],
                                employee_id: parseInt(data[2]),
                                job_name: data[3],
                                hours: parseFloat(data[1])
                            }
                        }));
                    });
                    return Promise.all(promises);
                })
                .then(function () {
                    return res.json({
                        message: 'success'
                    });
                })
                .catch(function ( err ) {
                    return next(err);
                })
        })
        .catch(function ( err ) {
            next(err);
        })
    });
    
});


router.get('/report', sessionAuthenticate, function ( req, res, next ) {
    let employeeLogEntries = [];
    return db.EmployeeLog.findAll({})
        .then(function ( data ) {
            employeeLogEntries = data;
            return db.Job.findAll({});
        })
        .then(function ( jobs ) {
            let jobRates = {};
            jobs.forEach(function ( j ) {
                jobRates[j.job_name] = j.rate;
            });
            let result = employeeLogEntries.map(function ( e ) {
                return {
                    amount: e.hours * ( jobRates[e.job_name] || 0),
                    log_date: e.log_date,
                    employee_id: e.employee_id,
                    report_number: e.report_number
                }
            });
            return res.json(result)
        })
        .catch(function ( err ) {
            next(err);
        })
});

router.get('/status', sessionAuthenticate, function ( req, res, next ) {
    return res.status(200).end();
});

router.get('/logout', function ( req, res, next ) {
    req.session.destroy(function ( err ) {
        if (err) {
            next(err);
        } else {
            return res.json({});
        }
    });
});

module.exports = router;