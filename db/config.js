const { default: mongoose } = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('DB connected');
  } catch (error) {
    console.log(error);
    throw new Error('Oops, something went wrong connecting to the DB');
  }
};

module.exports = { connectDB };
