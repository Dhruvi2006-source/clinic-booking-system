const validate = (schema) => (req, res, next) => {
  try {
    const validatedBody = schema.parse(req.body);
    // Replace req.body with the parsed/coerced body from Zod
    req.body = validatedBody;
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const errorDetails = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${errorDetails}`
      });
    }
    next(error);
  }
};

module.exports = validate;
