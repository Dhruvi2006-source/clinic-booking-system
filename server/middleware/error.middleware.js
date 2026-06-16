const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma unique constraint violation (e.g. duplicate email or overlapping appointment)
  if (err.code === 'P2002') {
    return res.status(400).json({
      success: false,
      message: 'A record with this unique value already exists.'
    });
  }

  // Prisma record not found
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: err.meta?.cause || 'Record not found.'
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
