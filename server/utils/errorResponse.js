/**
 * Express error: Error
 *  app.get('/', function (req, res) {
        throw new Error('BROKEN') // Express will catch this on its own.
    })
    just extending the express error
 */

class errorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = errorResponse;
