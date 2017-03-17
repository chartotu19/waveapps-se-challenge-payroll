/**
 * Created by chartotu on 08/03/17.
 */


function ForbiddenError(message) {
         this.name = 'ForbiddenError';
         this.httpErrorCode = 403;
         this.message = message || 'Not allowed';
         this.stack = (new Error()).stack;
}
ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

module.exports = ForbiddenError;