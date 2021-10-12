class HttpError extends Error {
    constructor(code, message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.code = code;
        this.json = JSON.stringify({code: this.code, error: this.message});
    }
}
module.exports = HttpError;
