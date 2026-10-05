import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <div>
      <NavBar />
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
