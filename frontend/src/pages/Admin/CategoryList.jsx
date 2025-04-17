import { useState } from 'react'
import { toast } from 'react-toastify'
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery
} from "../../redux/api/categorySlice"
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'

function CategoryList() {
    const { data: categories, refetch } = useFetchCategoriesQuery()
    const [name, setName] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatedName, setUpdatedName] = useState("")
    const [modalVisible, setModalVisible] = useState("")
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!name)
            return toast.error("Category name is required");
        try {
            const res = await createCategory({ name }).unwrap()
            if (res.error)
                toast.error(res.error)
            else {
                setName("")
                toast.success(`${res?.name} is created.`)
                refetch()
            }
        } catch (error) {
            console.log(error)
            toast.error("Creating Category Failed,try agin.")
        }
    }
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        console.log(updatedName);

        if (!updatedName)
            return toast.error("Category name is required.")
        try {
            const res = await updateCategory({
                categoryId: selectedCategory._id, updatedCategory: {
                    name: updatedName
                }
            }).unwrap()
            if (res.error)
                toast.error(res.error)
            else {
                toast.success(`${res.name} updated`)
                refetch()
                setSelectedCategory(null)
                setUpdatedName('')
                setModalVisible(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to update , try again")
        }
    }
    const handleDeleteCategory = async (e) => {
        try {

            const res = await deleteCategory(selectedCategory._id).unwrap()
            if (res.error)
                toast.error(res.error)
            else {
                toast.success(`${res?.name} is deleted.`)
                refetch()
                setSelectedCategory(null)
                setModalVisible(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete , try again")
        }
    }
    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            {/* AdminMenu */}
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>
                <CategoryForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateCategory}
                />
                <br />
                <hr />
                <div className="flex flex-wrap">
                    {
                        categories?.map(category => (
                            <div key={category._id} className="">
                                <button onClick={() => {
                                    setModalVisible(true)
                                    setSelectedCategory(category)
                                    setUpdatedName(category.name)
                                }} className='border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity cursor-pointer'>{category?.name}</button>
                            </div>
                        ))
                    }
                </div>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm value={updatedName} setValue={(value) => setUpdatedName(value)} handleSubmit={handleUpdateCategory} buttonText='Update' handleDelete={handleDeleteCategory} />
                </Modal>
            </div>
        </div>
    )
}

export default CategoryList