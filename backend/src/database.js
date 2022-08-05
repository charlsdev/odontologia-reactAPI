import mongoose from 'mongoose';
import { MONGO_URL } from './envCnf.js';

mongoose.connect(MONGO_URL)
   .then((db) => 
      console.log(`DB is connect to ${db.connection.host} - ${db.connection.name}...`)
   )
   .catch((err) => 
      console.log(err)
   );