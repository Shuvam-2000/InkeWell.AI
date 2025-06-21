import { useEffect, useRef, useState } from "react"
import { assets, blogCategories } from "../../assets/assets"
import Quill from "quill"

const AddBlog = () => {
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subtitle, setSubTitile] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateWithAI = async () => {

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    // intiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p className="mb-6">Upload Blog thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className="mt-2 h-16 rounded cursor-pointer" />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p className="mt-4">Add Blog Title</p>
        <input type= "text" placeholder="Enter Blog Title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className="mt-6">Add Blog Sub Title</p>
        <input type= "text" placeholder="Enter Blog Title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={(e) => setSubTitile(e.target.value)} value={subtitle} />

        <p className="mt-6">Add Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button type="button" onClick={generateWithAI} className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-black/80 cursor-pointer">Generate With AI</button>
        </div>

        <p className="mt-6">Select Blog Category</p>
        <select onChange={(e) => setCategory(e.target.value)}  name="category" className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded">
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <div className="flex gap-3 mt-6">
          <p>Publish Now</p>
           <input type="checkbox" checked={isPublished} className="scale cursor-pointer mt-1" onChange={(e) => setIsPublished(e.target.checked)}/> 
        </div>
        <button type="submit" className="mt-8 w-40 h-10 bg-primary hover:bg-blue-600 text-white rounded cursor-pointer text-sm">Add Blog</button>
      </div>
    </form>
  )
}

export default AddBlog