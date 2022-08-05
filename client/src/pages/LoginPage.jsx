import { useEffect } from "react";

import "../assets/css/login.min.css";

function LoginPage() {
   useEffect(() => {
      const inputs = document.querySelectorAll('.input');

      function addcl(){
         let parent = this.parentNode.parentNode;
         parent.classList.add('focus');
      }
      
      function remcl(){
         let parent = this.parentNode.parentNode;
         if(this.value == ''){
            parent.classList.remove('focus');
         }
      }
      
      inputs.forEach(input => {
         input.addEventListener('focus', addcl);
         input.addEventListener('blur', remcl);
      });
   }, [])
   

   return (
      <>
         <img className="wave" src="/img/bck.jpg" />

         <div className="containerLogin">
            <div className="img">
               <img src="/img/bc.svg" />
            </div>

            <div className="login-content">
               <form action="/login" method="POST">
                  <img src="/img/dental.png" />
                  <h2 className="title">Bienvenido</h2>

                  <div className="input-div one">
                     <div className="i">
                        <i className="fas fa-user"></i>
                     </div>
                     <div className="div">
                        <h5>Cédula</h5>
                        <input
                           type="text"
                           className="input"
                           id="username"
                           name="cedula"
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
                        />
                     </div>
                  </div>
                  <div className="link">
                     No tienes una cuenta? ¡Registrate!
                  </div>
                  <input type="submit" className="btnLogin" value="Login" />
               </form>
            </div>
         </div>
      </>
   );
}

export default LoginPage;
