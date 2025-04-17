import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import store from "./redux/store.js"
// auth
import Login from "./pages/Auth/Login"
import Register from './pages/Auth/Register.jsx'
// Private Route 
import PrivateRoute from './components/PrivateRoute.jsx'
// User specific routes which comes under private route !
import Profile from './pages/User/Profile.jsx'
// Admin Routes
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* Protected route for user*/}
          <Route path='' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          {/* Protected route for admin*/}
          <Route path='/admin' element={<AdminRoute />}>
            <Route path='userlist' element={<UserList />} />
            <Route path='categorylist' element={<CategoryList />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  </Provider>,
)
