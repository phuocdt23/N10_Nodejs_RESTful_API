const {StatusCodes} = require('http-status-codes');


function errorHandler(err, req, res, next) {
  let errorCode = err.code
  let { message } = err
  const code = err.code || StatusCodes.INTERNAL_SERVER_ERROR
  switch (code) {
    case StatusCodes.BAD_REQUEST:
      message = message || 'Bad Request'
      break
    case StatusCodes.UNAUTHORIZED:
      message = message || 'Unauthorized'
      break
    case StatusCodes.FORBIDDEN:
      message = message || 'Forbidden'
      break
    case StatusCodes.NOT_FOUND:
      message = message || 'Not Found'
      break
    case StatusCodes.CONFLICT:
      errorCode = StatusCodes.CONFLICT
      message = message || 'Conflict resources'
      break
    case StatusCodes.INTERNAL_SERVER_ERROR:
      errorCode = StatusCodes.INTERNAL_SERVER_ERROR
      message = message || 'Something went wrong'
      break
    default:
      message = message || getErrorMessage(code)
      errorCode = 200
  }
  return res.status(errorCode).json({message: message});
}

module.exports = {errorHandler}
