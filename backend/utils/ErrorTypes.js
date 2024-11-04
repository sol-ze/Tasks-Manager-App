const ErrorTypes = {
  ERR400: { status: 400, message: "Bad Request" },
  ERR401: { status: 401, message: "Unauthorized" },
  ERR404: { status: 404, message: "Not found" },
  ERR409: { status: 409, message: "Conflict" },
  ERR500: { status: 500, message: "Internal Server Error" },
};

module.exports = ErrorTypes;
