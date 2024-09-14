function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ messsage: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(401).send({ message: err });
  }

  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
