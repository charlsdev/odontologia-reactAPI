import "../assets/css/loader.min.css";

export default function Loader() {
   return (
      <div className="contentLoader">
         <div className="loader">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <p>Cargando...</p>
         </div>
      </div>
   );
}
