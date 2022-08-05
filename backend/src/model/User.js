import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

const usersSchema = new Schema ({
   cedula: {
      type: String,
      required: true,
      unique: true
   },
   apellidos: {
      type: String,
      required: true
   },
   nombres: {
      type: String,
      required: true
   },
   fechaNacimiento: {
      type: String,
      required: true
   },
   genero: {
      type: String,
      required: true
   },
   direccion: {
      type: String,
      required: true
   },
   telefono: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
}, {
   timestamps: true,
   versionKey: false
});

usersSchema.statics.encryptPassword = async password => {
   const salt = await genSalt(10);
   return await hash(password, salt);
};

usersSchema.statics.matchPassword = async function(password) {
   return await compare(password, this.password);
};

export default model('Usuarios', usersSchema);