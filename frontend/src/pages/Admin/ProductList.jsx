import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateProductMutation } from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice"
import { toast } from 'react-toastify'

function ProductList() {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [brand, setBrand] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [category, setCategory] = useState(null)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const navigate = useNavigate()
    const { data: categories } = useFetchCategoriesQuery()
    const [createProduct] = useCreateProductMutation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image)
            return toast.error("Image is required.")
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('brand', brand)
            formData.append('quantity', quantity)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('countInStock', countInStock)
            formData.append('image', image)

            await createProduct(formData).unwrap()

            toast.success('Product created successfully!')
            navigate('/')
        } catch (error) {
            console.error(err)
            toast.error('Failed to create product')
        }
    }
    return (
        <div className='container xl:mx-[9rem] sm:mx-[0]'>
            <form>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/4 p-3">
                        <div className="h-12">Create Product</div>
                        {
                            image && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(image)} alt="product" className='block mx-auto max-h-[200px] mb-5 w-[100%] object-cover' />
                                </div>
                            )
                        }
                        <div className="mb-3">
                            <label htmlFor='imageFile' className='border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
                                {
                                    image ? image.name : "Upload Image"
                                }
                                <input required type="file" id='imageFile' name='imageFile' className='hidden' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        </div>
                        <div className="py-3">
                            <div className="flex flex-wrap gap-x-10">
                                <div className="">
                                    <label htmlFor="name">Name</label><br />
                                    <input required type="text" id='name' className='p-4 mb-3 w-[30rem] rounded-lg border bg-[#101011] text-white' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="">
                                    <label htmlFor="price">Price</label><br />
                                    <input required type="number" id='price' className='p-4 mb-3 w-[30rem] rounded-lg border bg-[#101011] text-white' value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="">
                                    <label htmlFor="quantity">Quantity</label><br />
                                    <input required type="number" id='quantity' className='p-4 mb-3 w-[30rem] rounded-lg border bg-[#101011] text-white' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="">
                                    <label htmlFor="brand">Brand</label><br />
                                    <input required type="text" id='brand' className='p-4 mb-3 w-[30rem] rounded-lg border bg-[#101011] text-white' value={brand} onChange={(e) => setBrand(e.target.value)} />
                                </div>
                                <div className="w-[95%]">
                                    <label htmlFor="description" className='block my-2'>Description</label>
                                    <textarea required name="description" id="description" className='p-2 mb-3 bg-[#101011] border rounded-lg w-full text-white' type='text' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="flex justify-center gap-x-5">
                                    <div className="">
                                        <label htmlFor="countInStock">Count In Stock</label> <br />
                                        <input required type="number" id='countInStock' className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                                    </div>
                                    <div className="">
                                        <label htmlFor="">Category</label><br />
                                        <select required placeholder='Choose Category' className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' value={category} onChange={e => setCategory(e.target.value)}>
                                            {categories && categories.length > 0 &&
                                                categories.map(c => (
                                                    <option key={c._id} value={c._id}>{c.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <button onClick={handleSubmit} className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 cursor-pointer'>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductList