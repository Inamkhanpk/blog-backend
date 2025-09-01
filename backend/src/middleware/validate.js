const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }
};

module.exports = { validate };