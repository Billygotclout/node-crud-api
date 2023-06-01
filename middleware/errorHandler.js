const { constants } = require("../constants");

const errorHandler = (err, res, req, next) => {
  const status = res.statusCode ? res.statusCode : 500;

  switch (status) {
    case constants.NOT_FOUND:
      res.status(404);
      throw new Error("Not found");
      
    case constants.FORBIDDEN:
      res.status(400);
      throw new Error("Validation Error");
    case constants.NOT_FOUND:
      res.status(403);
      throw new Error("Forbidden");
    case constants.NOT_FOUND:
      res.status(401);
      throw new Error("Unauthorised!");
    case constants.NOT_FOUND:
      res.status(401);
      throw new Error("Unauthorised!");
    case constants.NOT_FOUND:
      res.status(500);
      throw new Error("Server error");

    default:
        console.log("No error");
      break;
  }
};

module.exports=errorHandler;