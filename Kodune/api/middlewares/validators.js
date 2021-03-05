const validators = {};

validators.createStudent = (req, res, next) => {
  const { id, description } = req.body;
  if (id && description) {
    next();
  } else {
    res.status(400).json({
      error: 'Something is missing',
    });
  }
};

validators.getStudentById = (req, res, next) => {
  const { id } = req.params;
  if (id) {
    next();
  } else {
    res.status(400).json({
      error: 'No id provided',
    });
  }
};

module.exports = validators;
