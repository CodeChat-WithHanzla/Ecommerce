import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
function AdminRoute() {
    const { userInfo } = useSelector(state => state.auth)
    return (userInfo && userInfo.isAdmin) ? <Outlet /> : <Navigate to='/login' replace />
}

export default AdminRoute