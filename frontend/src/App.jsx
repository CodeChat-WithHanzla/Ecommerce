import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from './redux/features/auth/authSlice';
import { useLogoutMutation } from './redux/api/usersApiSlice';
export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation()
  useEffect(() => {
    const checkExpiration = async () => {
      const expirationTime = localStorage.getItem("expirationTime");

      if (expirationTime && new Date().getTime() > Number(expirationTime)) {
        await logoutApiCall();
        dispatch(logout());
        navigate('/login');
      }
    };

    checkExpiration();
  }, [dispatch, logoutApiCall, navigate]);
  return (
    <>
      <ToastContainer />
      <main>
        <Navigation />
        <Outlet />
      </main>
    </>
  )
}