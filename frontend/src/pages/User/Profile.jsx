import { useState, useEffect } from 'react'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../components/Loader"
import { setCredientials } from "../../redux/features/auth/authSlice"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
function Profile() {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { userInfo } = useSelector(state => state.auth)
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()
  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return toast.error("Password do not match")
    try {
      const updateData = {
        _id: userInfo._id,
        username,
        email
      };

      if (password) {
        updateData.password = password;
      }
      const res = await updateProfile(updateData).unwrap()
      dispatch(setCredientials({ ...res }))
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  }
  useEffect(() => {
    setUserName(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])
  const dispatch = useDispatch()
  return (
    <div className='container mx-auto p-4'>
      <div className="flex justify-center items-center md:flex md:space-x-4 mt-[10rem]">
        <div className="md:w-1/3">
          <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className='block text-white mb-4'>Name</label>
              <input type='text' placeholder='Enter name' className='form-input p-4 rounded-sm w-full' value={username} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className='block text-white mb-4'>Email</label>
              <input type='email' placeholder='Enter email' className='form-input p-4 rounded-sm w-full' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className='block text-white mb-4'>Password</label>
              <input type='password' placeholder='Enter password' className='form-input p-4 rounded-sm w-full' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className='block text-white mb-4'>Confirm Password</label>
              <input type='password' placeholder='Confirm password' className='form-input p-4 rounded-sm w-full' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>

            <div className="flex justify-between">
              <button type='submit' className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600'>Update</button>
              <Link to='/user-orders' className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700'>My Orders</Link>
            </div>

          </form>
        </div>
        {
          loadingUpdateProfile && <Loader />
        }
      </div>
    </div>
  )
}

export default Profile