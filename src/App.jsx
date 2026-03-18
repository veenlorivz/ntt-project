import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { logout } from "./redux/actions/userActions";

import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";

import "./app.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    !cookies?.get("access_token") && dispatch(logout());
  }, []);

  return (
    <Routes>
      <Route path={"/login"} element={<Login />}></Route>
      <Route path="*" element={<Main />}></Route>
    </Routes>
  );
}

export default App;