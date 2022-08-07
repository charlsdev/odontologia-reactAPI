import { IMaskInput } from "react-imask";

import { useLoader } from "../context/LoaderContext";
import Loader from "../components/Loader";

import { loginUser } from "../api/fntAPI";
import { resCode } from "../helpers/validations";
import { cedulaRgx } from "../helpers/regex";

function FormLogin({ dataLogin, setDataLogin, setShow, Swal, Toast }) {
   // Recuperamos las variables del contexto
   const { loading, setLoading } = useLoader();

   const handleShow = () => setShow(true);

   const handleSubmitLogin = async (e) => {
      e.preventDefault();

      if (dataLogin.cedula === "" || dataLogin.password === "") {
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
            timer: 1500,
         });
      } else {
         setLoading(true);

         try {
            let resp = await loginUser(dataLogin);

            if (resp.data.msg === "true") {
               Swal.fire({
                  title: resp.data.tittle,
                  html: `<p style="font-size: 1rem;">${resp.data.description}</p>`,
                  icon: resp.data.icon,
                  confirmButtonColor: "#049947",
                  allowOutsideClick: false,
               }).then((result) => {
                  if (result.value === true) {
                     // Rutas
                  }
               });
            }
         
            if (resp.data.msg === "alert") {
               Swal.fire({
                  title: resp.data.tittle,
                  html: `<p style="font-size: 1rem;">${resp.data.description}</p>`,
                  icon: resp.data.icon,
                  confirmButtonColor: "#049947",
                  allowOutsideClick: false,
               });
            }
         } catch (e) {
            console.log(e);
         }

         setLoading(false);
      }
   };

   return (
      <>
         {loading && <Loader />}

         <form onSubmit={handleSubmitLogin}>
            <img src="/img/dental.png" />
            <h2 className="title">Bienvenido</h2>

            <div className="input-div one">
               <div className="i">
                  <i className="fas fa-user"></i>
               </div>
               <div className="div">
                  <h5>Cédula</h5>
                  <IMaskInput
                     mask={cedulaRgx}
                     type="text"
                     className="input"
                     id="cedula"
                     name="cedula"
                     required
                     value={dataLogin.cedula}
                     onChange={(e) =>
                        setDataLogin({
                           ...dataLogin,
                           cedula: e.target.value,
                        })
                     }
                  />
               </div>
            </div>
            <div className="input-div pass">
               <div className="i">
                  <i className="fas fa-lock"></i>
               </div>
               <div className="div">
                  <h5>Contraseña</h5>
                  <input
                     type="password"
                     className="input"
                     id="password"
                     name="password"
                     value={dataLogin.password}
                     required
                     onChange={(e) =>
                        setDataLogin({
                           ...dataLogin,
                           password: e.target.value,
                        })
                     }
                  />
               </div>
            </div>
            <div className="link" onClick={handleShow}>
               No tienes una cuenta? ¡Registrate!
            </div>
            <input type="submit" className="btnLogin" value="Login" />
         </form>
      </>
   );
}

export default FormLogin;
