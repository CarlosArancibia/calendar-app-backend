const { response, request } = require('express');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/generate-jwt');

const createUser = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  try {
    // validate if email exist
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email alredy exists',
      });
    }

    user = new User({ name, email, password });

    // encrypt password
    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    // generate JWT
    const token = await generateJWT(user.id, name);

    // save user
    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Oops, something went wrong, talk to your administrator',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid credentials',
      });
    }

    isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid credentials',
      });
    }

    // generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Oops, something went wrong, talk to your administrator',
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
