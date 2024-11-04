const ResponseError = require("../utils/RsponseError");

const validateSchema = (userInput, schema) => {
  return new Promise((resolve, reject) => {
    schema
      .validateAsync(userInput, { abortEarly: false })
      .then((validatedValue) => {
        resolve(validatedValue);
      })
      .catch((err) => {
        let details = err.details.map((error) =>
          error.message.replaceAll('"', "")
        );
        reject(err);
      });
  });
};

module.exports = validateSchema;
