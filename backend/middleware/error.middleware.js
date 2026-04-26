const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  res
    .status(err.statusCode)
    .json({ success: true, message: err.message || "server error" });
};
export default errorMiddleware;
