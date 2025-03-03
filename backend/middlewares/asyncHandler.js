export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) =>
    res
      .status(error.statusCode || 500)
      .json({
        message: error.message || `Server error :: ${error} at ${error.stack}`
      })
  );
};
