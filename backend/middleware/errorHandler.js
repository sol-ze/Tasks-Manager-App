const errorHandler = (err, req, res, next) => {
  const json = { message: err.message, status: err.status };
  //   if (err.stack) {
  //     json.stack = err.stack;
  //   }
  res.status(err.status).json(json);
};

module.exports = errorHandler;
