import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { IMaskInput } from "react-imask";

import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";

import { resCode, validarAd } from "../helpers/validations";
import {
   cedulaRgx,
   directionRgx,
   emailRgx,
   letterSpaceRgx,
   numberRgx,
} from "../helpers/regex";

import { registerUser } from "../api/fntAPI";

const dataUser = {
   cedula: "",
   apellidos: "",
   nombres: "",
   fechaNacimiento: "",
   genero: "",
   direccion: "",
   telefono: "",
   email: "",
   password: "",
   confPassword: "",
};

function ModalRegister({ show, setShow, Swal }) {
   // Recuperamos las variables del contexto
   const { loading, setLoading } = useLoader();

   const [dataRegister, setDataRegister] = useState(dataUser);

   const handleClose = () => {
      setShow(false);
      setDataRegister(dataUser);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      let cedula = dataRegister.cedula.trim(),
         apellidos = dataRegister.apellidos.trim(),
         nombres = dataRegister.nombres.trim(),
         fechaNacimiento = dataRegister.fechaNacimiento.trim(),
         genero = dataRegister.genero.trim(),
         direccion = dataRegister.direccion.trim(),
         telefono = dataRegister.telefono.trim(),
         email = dataRegister.email.trim(),
         password = dataRegister.password.trim(),
         confPassword = dataRegister.confPassword.trim();

      if (
         cedula === "" ||
         apellidos === "" ||
         nombres === "" ||
         fechaNacimiento === "" ||
         genero === "" ||
         direccion === "" ||
         telefono === "" ||
         email === "" ||
         password === "" ||
         confPassword === ""
      ) {
         Swal.fire({
            position: "top-end",
            title: "CAMPOS VACÍOS",
            html: `<p style="font-size: 1rem;">Los campos no pueden ir vacíos o con espacios.</p>`,
            imageUrl: "/img/dental.png",
            imageWidth: 230,
            imageHeight: 150,
            imageAlt: "Dental System",
            confirmButtonColor: "#049947",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 2000,
         });
      } else {
         if (password !== confPassword) {
            Swal.fire({
               position: "top-end",
               title: "CONTRASEÑAS DIFERENTES",
               html: `<p style="font-size: 1rem;">La confirmación de la contraseña debe de ser igual a la original.</p>`,
               icon: "warning",
               confirmButtonColor: "#049947",
               allowOutsideClick: false,
               showConfirmButton: false,
               timer: 2000,
            });
         } else {
            setLoading(true);

            try {
               const resp = await registerUser({
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
               });

               resCode(resp.data, handleClose, setLoading);
            } catch (e) {
               console.log(e);
            }
         }
      }
   };

   return (
      <>
         {/* Si esta V se muestra caso contrario no hace nada */}
         {loading && <Loader />}

         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
         >
            <Form className="form-control" onSubmit={handleSubmit}>
               <Modal.Header className="header__modal">
                  <Modal.Title className="tittle__modal">
                     REGISTRARSE
                  </Modal.Title>
               </Modal.Header>

               <Modal.Body className="body__modal">
                  <div className="row">
                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Cédula</label>
                        <IMaskInput
                           mask={cedulaRgx}
                           type="text"
                           className="form-control"
                           name="cedula"
                           placeholder="Ingrese su cédula: 131******"
                           required
                           onAccept={(value) => {
                              if (value.length === 10) {
                                 validarAd(value);
                              }
                           }}
                           value={dataRegister.cedula}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 cedula: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Apellidos</label>
                        <IMaskInput
                           mask={letterSpaceRgx}
                           type="text"
                           className="form-control"
                           name="apellidos"
                           placeholder="Ingrese sus apellidos: Ej. Villacreses Parrales"
                           required
                           value={dataRegister.apellidos}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 apellidos: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Nombres</label>
                        <IMaskInput
                           mask={letterSpaceRgx}
                           type="text"
                           className="form-control"
                           name="nombres"
                           placeholder="Ingrese sus nombres: Ej. Carlos Andrés"
                           required
                           value={dataRegister.nombres}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 nombres: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">
                           Fecha de Nacimiento
                        </label>
                        <input
                           type="date"
                           className="form-control"
                           name="fechaNacimiento"
                           placeholder="Escoja su fecha de nacimiento"
                           required
                           value={dataRegister.fechaNacimiento}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 fechaNacimiento: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Género</label>
                        <select
                           name="genero"
                           className="form-control"
                           required
                           value={dataRegister.genero}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 genero: e.target.value,
                              })
                           }
                        >
                           <option value={""} disabled>
                              Seleccione su género
                           </option>
                           <option value={"Masculino"}>Masculino</option>
                           <option value={"Femenino"}>Femenino</option>
                           <option value={"No definido"}>No definido</option>
                        </select>
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Dirección</label>
                        <IMaskInput
                           mask={directionRgx}
                           type="text"
                           className="form-control"
                           name="direccion"
                           placeholder="Ingrese su dirección: Ej. Vía a Daule"
                           required
                           value={dataRegister.direccion}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 direccion: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Teléfono</label>
                        <IMaskInput
                           mask={numberRgx}
                           type="text"
                           className="form-control"
                           name="telefono"
                           placeholder="Ingrese su teléfono: Ej. 099*******"
                           required
                           maxLength={10}
                           value={dataRegister.telefono}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 telefono: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Email</label>
                        <IMaskInput
                           mask={emailRgx}
                           type="email"
                           className="form-control"
                           name="email"
                           placeholder="Ingrese su correo electrónico: Ej. dental@dominio.xyz"
                           required
                           value={dataRegister.email}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 email: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">Contraseña</label>
                        <input
                           type="password"
                           className="form-control"
                           name="password"
                           placeholder="Ingrese su contraseña"
                           required
                           minLength={8}
                           value={dataRegister.password}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 password: e.target.value,
                              })
                           }
                        />
                     </div>

                     <div className="col-md-12 mb-2">
                        <label className="form-label ">
                           Confirmar Contraseña
                        </label>
                        <input
                           type="password"
                           className="form-control"
                           name="confPassword"
                           placeholder="Confirme su contraseña"
                           required
                           minLength={8}
                           value={dataRegister.confPassword}
                           onChange={(e) =>
                              setDataRegister({
                                 ...dataRegister,
                                 confPassword: e.target.value,
                              })
                           }
                        />
                     </div>
                  </div>
               </Modal.Body>

               <Modal.Footer className="footer__modal">
                  <button
                     type="button"
                     className="btn btn-outline-secondary btn-sm btnGeneral"
                     onClick={handleClose}
                  >
                     Cerrar
                  </button>

                  <button
                     type="submit"
                     className="btn btn-outline-danger btn-sm btnGeneral"
                  >
                     Registrar
                  </button>
               </Modal.Footer>
            </Form>
         </Modal>
      </>
   );
}

export default ModalRegister;
