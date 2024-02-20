// import Files from "./components/Files/Files";
import { RouterProvider } from "react-router-dom";
import router from "./router";


function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
