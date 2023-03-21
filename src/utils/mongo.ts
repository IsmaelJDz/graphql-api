import mongoose from 'mongoose';
import config from 'config';

/** Demo connection mongo */

// export async function connect(): Promise<Mongoose> {
//   const mongoUri = config.get('mongo.uri');
//   const mongoose = new Mongoose();
//   await mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   });
//   return mongoose;
// }

export async function connectToMongo() {
  try {
    await mongoose.connect(config.get('dbUri'));

    console.log('Connected to MongoDB 🥳🥳🥳');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
