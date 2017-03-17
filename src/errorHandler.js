module.exports = function (err, req, res, next) {
   
	console.log(err);
    // plug in sentry SDK here
    if(err.httpErrorCode){
        return res.status(err.httpErrorCode).json({
            message : err.message
        });
    } else {
        return res.status(500).json({
            message : "unexpected error"
        });
    }
};
