/**
 * Created by chartotu on 15/03/17.
 */

import ForbiddenError from './errors/ForbiddenError';

module.exports = {
    
    sessionAuthenticate: function ( req, res, next ) {
        console.log(req.session.email, req.session);
        if (!!req.session && req.session.email != undefined) {
            req.session.isAuthenticated = true;
            next();
        } else {
            res.status(403).end();
        }
    }
    
};
