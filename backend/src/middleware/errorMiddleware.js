export const notFound = (
  req,
  res
) => {

  res.status(404).json({
    success: false,

    message:
      `Route not found: ${req.method} ${req.originalUrl}`
  });

};

export const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(err);

  if (
    err.name ===
    "ValidationError"
  ) {

    return res.status(400).json({
      success: false,

      message:
        "Validation error",

      errors:
        Object.values(
          err.errors
        ).map(
          (error) =>
            error.message
        )
    });

  }

  if (err.code === 11000) {

    return res.status(409).json({
      success: false,

      message:
        "A record with that value already exists"
    });

  }

  if (
    err.name ===
    "CastError"
  ) {

    return res.status(400).json({
      success: false,

      message:
        "Invalid resource ID"
    });

  }

  res.status(
    err.statusCode || 500
  ).json({

    success: false,

    message:
      err.message ||
      "Internal server error"

  });

};