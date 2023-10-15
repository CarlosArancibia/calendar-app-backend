const { sign } = require('jsonwebtoken');

const generateJWT = async (uid, name) => {
  const payload = { uid, name };

  try {
    const token = sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Oops, something went error, the token could not be generated');
  }
};

module.exports = { generateJWT };
