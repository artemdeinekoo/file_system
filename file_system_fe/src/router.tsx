import { createBrowserRouter } from "react-router-dom";
import Files from "./Pages/Files/Files";
import Search from "./Pages/Search/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Files />,
  },

  {
    path: "/search",
    element: <Search />,
  },
]);

export default router;
