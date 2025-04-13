import React, { useEffect, useState } from 'react'
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdatedUserMutation
} from "../../redux/api/usersApiSlice"
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

function UserList() {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdatedUserMutation()
    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')
    useEffect(() => {
        refetch()
    }, [refetch])
    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id)
                toast.success("User deleted Successfully!")
                refetch()
            } catch (error) {
                toast.error(error.data.message || error.message)
            }
        }
    }
    const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }
    const updateHandler = async (id) => {
        try {
            await updateUser({
                userId: id,
                username: editableUserName,
                email: editableUserEmail
            })
            toast.success("User updated Successfully!")
            setEditableUserId(null)
            refetch()
        } catch (error) {
            toast.error(error?.data?.message || error?.message)
        }
    }
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-semibold my-4 md:ml-16'>Users</h1>
            {isLoading ? <Loader /> : error ? (<Message variant='failure' children={`${error?.data.message || error.message}`} />)
                : (<div className="flex flex-col md:flex-row">
                    {/* AdminMenu */}
                    <table className='w-full md:w-4/5 mx-auto'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 text-left'>ID</th>
                                <th className='px-4 py-2 text-left'>Name</th>
                                <th className='px-4 py-2 text-left'>Email</th>
                                <th className='px-4 py-2 text-left'>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <tr key={user?._id}>
                                    <td className='px-4 py-2'>{user?._id}</td>
                                    <td className='px-4 py-2'>{
                                        editableUserId === user?._id ? (
                                            <div className="flex items-center">
                                                <input className='w-full p-2 border rounded-lg' type="text" value={editableUserName} onChange={(e) => setEditableUserName(e.target.value)} />
                                                <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">{user.username}{" "} <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className='ml-[1rem]' />
                                            </button> </div>
                                        )
                                    }</td>
                                    <td className='px-4 py-2'>{editableUserId === user?._id ? (
                                        <div className="flex items-center">
                                            <input type="text" value={editableUserEmail} onChange={(e) => setEditableUserEmail(e.target.value)} className='w-full p-2 border rounded-lg' />
                                            <button className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg' onClick={() => updateHandler(user._id,)}>
                                                <FaCheck />
                                            </button>
                                        </div>
                                    ) : (

                                        <div className="flex items-center">
                                            <p>{user.email}</p>
                                            <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className='ml-[1rem]' />
                                            </button>
                                        </div>
                                    )}</td>
                                    <td className='px-4 py-2'>
                                        {user.isAdmin ? (<FaCheck className='text-green-600' />) : (
                                            <FaTimes className='text-red-600' />
                                        )}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => deleteHandler(user._id)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                )}
        </div>
    )
}

export default UserList