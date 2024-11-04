const ErrorTypes = require("./ErrorTypes");

class ResponseError extends Error {
  constructor(err) {
    super(err.message);
    this.status = err.status;
  }

  static generateExceptionError(e) {
    e = e || ErrorTypes.ERR500;
    const result = new ResponseError({ status: 500, message: e.toString() });
    return result;
  }
}

module.exports = ResponseError;
