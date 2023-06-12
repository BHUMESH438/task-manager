class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); //child class
    this.statusCode = statusCode;
  }
}
// error is an inbult obj from that we are invokinhg the msg asnd adding the statuscode
//creating a new instance through a function super
const CreateCustomError = (message, statusCode) => new CustomAPIError(message, statusCode);

module.exports = { CreateCustomError, CustomAPIError };
