const errorMessage = (message) => ({ message });

const errorsMessages = (res, message, code) => {
  switch (code) {
    case 'conflict':
      return res.status(409).json(errorMessage(message));
    case 'bad_request':
      return res.status(400).json(errorMessage(message));
    case 'invalid_data':
      return res.status(422).json(errorMessage(message));
    case 'unauthorized':
      return res.status(401).json(errorMessage(message));
    case 'not_found':
      return res.status(404).json(errorMessage(message));
    default:
      return res
        .status(500)
        .json({ error: { message: 'Erro Interno', code: 500 } });
  }
};

module.exports = errorsMessages;
