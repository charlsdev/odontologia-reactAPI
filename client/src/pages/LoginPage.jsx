import { useEffect, useState } from "react";
import "../assets/css/login.min.css";
import Swal from "sweetalert2";

import ModalRegister from "../components/ModalRegister";
import FormLogin from "../components/FormLogin";

const Toast = Swal.mixin({
   toast: true,
   position: "top-end",
   showConfirmButton: false,
   timer: 5000,
   timerProgressBar: true,
   didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
   },
});

function LoginPage() {
   const [dataLogin, setDataLogin] = useState({
      cedula: "",
      password: "",
   });

   const [show, setShow] = useState(false);

   useEffect(() => {
      const inputs = document.querySelectorAll(".input");

      function addcl() {
         let parent = this.parentNode.parentNode;
         parent.classList.add("focus");
      }

      function remcl() {
         let parent = this.parentNode.parentNode;
         if (this.value == "") {
            parent.classList.remove("focus");
         }
      }

      inputs.forEach((input) => {
         input.addEventListener("focus", addcl);
         input.addEventListener("blur", remcl);
      });
   }, []);

   return (
      <>
         <img className="wave" src="/img/bck.jpg" />
         <div className="containerLogin">
            <div className="img">
               <img src="/img/bc.svg" />
            </div>

            <div className="login-content">
               <FormLogin
                  dataLogin={dataLogin}
                  setDataLogin={setDataLogin}
                  setShow={setShow}
                  Swal={Swal}
                  Toast={Toast}
               />
            </div>
         </div>

         <ModalRegister
            show={show}
            setShow={setShow}
            Swal={Swal}
            Toast={Toast}
         />
      </>
   );
}

export default LoginPage;
