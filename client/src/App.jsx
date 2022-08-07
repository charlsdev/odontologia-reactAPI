import LoginPage from "./pages/LoginPage";
import { LoaderContextProvider } from "./context/LoaderContext";

function App() {
   return (
      <LoaderContextProvider>
         <div className="App">
            <LoginPage />
         </div>
      </LoaderContextProvider>
   );
}

export default App;
