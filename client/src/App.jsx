import { useState } from "react";
// import Loader from "./components/Loader";
import LoginPage from "./pages/LoginPage";

function App() {
   // const [loading, setLoading] = useState(true);

   return (
      // <>
      //    {loading ? (
      //       <Loader />
      //    ) : (
      //       <>

      //       </>
      //    )}
      // </>

      <div className="App">
         <LoginPage />
      </div>
   );
}

export default App;
