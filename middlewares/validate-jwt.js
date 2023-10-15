const { request } = require('express');
const { verify } = require('jsonwebtoken');

const validateJWT = async (req = request, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token', //'The service cannot process the request',
    });
  }

  try {
    const { uid, name } = await verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
};

module.exports = { validateJWT };
