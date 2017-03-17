/**
 * Created by chartotu on 08/03/17.
 */

function BadRequestError(message) {
    this.name = 'BadRequestError';
    this.httpErrorCode = 400;
    this.message = message || 'Not allowed';
    this.stack = (new Error()).stack;
}
BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

module.exports = BadRequestError;