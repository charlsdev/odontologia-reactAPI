import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { serialize } from 'cookie';

import UserModel from '../model/User.js';

import {
   validate_cedula,
   validate_letrasSpace,
   validate_letras,
   validate_fecha,
   validate_email,
   validate_telefono,
} from '../validations/validations.js';

export const register = async (req, res) => {
   let toast = [];

   const {
      cedula,
      apellidos,
      nombres,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      email,
      password,
      confPassword,
   } = req.body;

   let cedulaN = cedula.trim(),
      apellidosN = apellidos.trim(),
      nombresN = nombres.trim(),
      fechaNacimientoN = fechaNacimiento.trim(),
      generoN = genero.trim(),
      direccionN = direccion.trim(),
      telefonoN = telefono.trim(),
      emailN = email.trim(),
      passwordN = password.trim(),
      confPasswordN = confPassword.trim();

   if (
      cedulaN === '' ||
      apellidosN === '' ||
      nombresN === '' ||
      fechaNacimientoN === '' ||
      generoN === '' ||
      direccionN === '' ||
      telefonoN === '' ||
      emailN === '' ||
      passwordN === '' ||
      confPasswordN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         msg: 'false',
      });
   } else {
      if (!validate_cedula(cedulaN)) {
         toast.push({
            tittle: 'Cédula incorrecta',
            description: 'La cédula es incorrecta...',
            icon: 'error',
         });
      }

      if (!validate_letrasSpace(apellidosN)) {
         toast.push({
            tittle: 'Apellido incorrecto',
            description: 'El apellido escrito no cumple el formato...',
            icon: 'error',
         });
      }

      if (!validate_letrasSpace(nombresN)) {
         toast.push({
            tittle: 'Nombre incorrecto',
            description: 'El nombre escrito no cumple el formato...',
            icon: 'error',
         });
      }

      if (!validate_telefono(telefonoN)) {
         toast.push({
            tittle: 'Telefono incorrecto',
            description: 'El telefono ingresado es incorrecto...',
            icon: 'error',
         });
      }

      if (!validate_letras(generoN)) {
         toast.push({
            tittle: 'Género incorrecto',
            description: 'El genero elegido no cumple el formato...',
            icon: 'error',
         });
      }

      if (!validate_email(emailN)) {
         toast.push({
            tittle: 'Email incorrecto',
            description: 'El email ingresado no es correcto...',
            icon: 'error',
         });
      }

      if (!validate_fecha(fechaNacimientoN)) {
         toast.push({
            tittle: 'Fecha incorrecta',
            description: 'La fecha ingresada es incorrecta...',
            icon: 'error',
         });
      }

      if (passwordN != confPasswordN) {
         toast.push({
            tittle: 'Contraseñas incorrectas',
            description: 'La confirmación de contraseña no coinciden...',
            icon: 'warning',
         });
      }

      if (toast.length > 0) {
         res.json({
            toast,
            msg: 'toast',
         });
      } else {
         try {
            const searchUser = await UserModel.findOne({
               cedula: cedulaN,
            }).lean();

            if (searchUser) {
               res.json({
                  tittle: 'USUARIO EXISTENTE',
                  description: 'El usuario ya se encuentra registrado.',
                  icon: 'info',
                  msg: 'false'
               });
            } else {
               const newUser = new UserModel({
                  cedula: cedulaN,
                  apellidos: apellidosN,
                  nombres: nombresN,
                  fechaNacimiento: fechaNacimientoN,
                  genero: generoN,
                  direccion: direccionN,
                  telefono: telefonoN,
                  email: emailN,
                  password: passwordN,
               });

               newUser.password = await newUser.encryptPassword(passwordN);
               const savedUser = await newUser.save();

               if (savedUser) {
                  res.json({
                     tittle: 'USUARIO REGISTRADO',
                     description: 'Se ha registrado con éxito',
                     icon: 'success',
                     msg: 'true',
                  });
               } else {
                  res.json({
                     tittle: 'USUARIO NO REGISTRADO',
                     description: 'No se ha podido registrar al usuario',
                     icon: 'info',
                     msg: 'false',
                  });
               }
            }
         } catch (e) {
            console.log(e);

            res.json({
               tittle: 'Problemas',
               description: 'Opss! Error 500 x_x. ¡Intentelo más luego!',
               icon: 'error',
               msg: 'error',
            });
         }
      }
   }
};

export const login = async (req, res) => {
   const {
      cedula,
      password
   } = req.body;

   let cedulaN = cedula.trim(),
      passwordN = password.trim();

   if (
      cedulaN === '' ||
      passwordN === ''
   ) {
      res.json({
         tittle: 'Campos Vacíos',
         description: 'Los campos no pueden ir vacíos o con espacios!',
         icon: 'warning',
         msg: 'alert',
      });
   } else {
      try {
         const searchUser = await UserModel
            .findOne({
               cedula: cedulaN
            })
            .select({
               cedula: 1,
               apellidos: 1,
               nombres: 1,
               password: 1
            });
            
         if (searchUser) {
            const verifyPass = await searchUser.matchPassword(passwordN);
            
            if (verifyPass) {
               const payloadToken = {
                  id: searchUser._id,
                  cedula: searchUser.cedula,
                  nameC: `${searchUser.nombres} ${searchUser.apellidos}`,
               };

               const token = sign(
                  payloadToken,
                  process.env.SECRET,
                  {
                     expiresIn: 60 * 60 * 24       //Segundos * Hora * Dia
                  }
               );

               const serialized = serialize('myPassAuth', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'strict',
                  maxAge: 60 * 60 * 24,            //Segundos * Hora * Dia
                  path: '/',
               });

               res.setHeader('Set-Cookie', serialized);

               res.json({
                  tittle: 'CREDENCIALES CORRECTAS',
                  description: 'Inicio de sesión exitoso. Disfruta del sistema.',
                  icon: 'success',
                  msg: 'alert',
               });

            } else {
               res.json({
                  tittle: 'CREDENCIALES INCORRECTAS',
                  description: 'Opss! Las credenciales son incorrectas.',
                  icon: 'warning',
                  msg: 'alert',
               });
            }
         } else {
            res.json({
               tittle: 'CREDENCIALES INCORRECTAS',
               description: 'Opss! Las credenciales son incorrectas.',
               icon: 'warning',
               msg: 'alert',
            });
         }

      } catch (e) {
         console.log(e);

         res.json({
            tittle: 'Problemas',
            description: 'Opss! Error 500 x_x. ¡Intentelo más luego!',
            icon: 'error',
            msg: 'alert',
         });
      }
   }
};
