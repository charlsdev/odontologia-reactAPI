import { useState } from "react";
import { Modal } from "react-bootstrap";

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
   confPassword: ""
}

function ModalRegister({ show, setShow, Swal, Toast }) {
   const [dataRegister, setDataRegister] = useState(dataUser);

   const handleClose = () => {
      setShow(false)
      setDataRegister(dataUser)
   };

   return (
      <Modal
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
         centered
      >
         <Modal.Header className="header__modal">
            <Modal.Title className="tittle__modal">
               REGISTRAR USUARIO
            </Modal.Title>
         </Modal.Header>

         <Modal.Body className="body__modal">
            <div className="row">
               <div className="col-md-12 mb-2">
                  <label className="form-label lblLogin">Cédula</label>
                  <input
                     type="text"
                     className="form-control iptLogin"
                     name="cedula"
                     maxLength={10}
                     placeholder="Ingrese su cédula"
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
                  <label className="form-label lblLogin">Apellidos</label>
                  <input
                     type="text"
                     className="form-control iptLogin"
                     name="apellidos"
                     placeholder="Ingrese su apellido"
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
                  <label className="form-label lblLogin">Nombres</label>
                  <input
                     type="text"
                     className="form-control iptLogin"
                     name="nombres"
                     placeholder="Ingrese su nombre"
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
                  <label className="form-label lblLogin">
                     Fecha de Nacimiento
                  </label>
                  <input
                     type="date"
                     className="form-control iptLogin"
                     name="fechaNacimiento"
                     placeholder="Escoja su fecha de nacimiento"
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
                  <label className="form-label lblLogin">Género</label>
                  <select
                     name="genero"
                     className="form-control iptLogin"
                     value={dataRegister.genero}
                     onChange={(e) =>
                        setDataRegister({
                           ...dataRegister,
                           genero: e.target.value,
                        })
                     }
                  >
                     <option value={""} disabled>
                        Seleccionar...
                     </option>
                     <option value={"Masculino"}>Masculino</option>
                     <option value={"Femenino"}>Femenino</option>
                     <option value={"No definido"}>No definido</option>
                  </select>
               </div>
               <div className="col-md-12 mb-2">
                  <label className="form-label lblLogin">Dirección</label>
                  <input
                     type="text"
                     className="form-control iptLogin"
                     name="direccion"
                     placeholder="Ingrese su dirección"
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
                  <label className="form-label lblLogin">Teléfono</label>
                  <input
                     type="text"
                     className="form-control iptLogin"
                     name="telefono"
                     placeholder="Ingrese su teléfono"
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
                  <label className="form-label lblLogin">Email</label>
                  <input
                     type="text"
                     className="form-control iptLogin"
                     name="email"
                     placeholder="Ingrese su correo electrónico"
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
                  <label className="form-label lblLogin">Contraseña</label>
                  <input
                     type="password"
                     className="form-control iptLogin"
                     name="password"
                     placeholder="Ingrese su contraseña"
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
                  <label className="form-label lblLogin">
                     Confirmar Contraseña
                  </label>
                  <input
                     type="password"
                     className="form-control iptLogin"
                     name="confPassword"
                     placeholder="Confirme su contrraseña"
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
               type="button"
               className="btn btn-outline-danger btn-sm btnGeneral"
               onClick={handleClose}
            >
               Registrar
            </button>
         </Modal.Footer>
      </Modal>
   );
}

export default ModalRegister;
