import { Outlet } from 'react-router-dom';
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"


export default function App() {
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