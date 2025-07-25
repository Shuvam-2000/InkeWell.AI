import { useEffect, useState } from "react";
import BlogTableItem from "./BlogTableItem"; 
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext()

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/user/blogs')
      if(data?.success){
        setBlogs(data.blogs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col pt-1 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 w-full">
      <h1 className="text-xl font-semibold mb-4">All Your Blogs:</h1>

      {/* List of Blogs */}
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">No</th>
              <th scope="col" className="px-2 py-4">Blog Title</th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
              <th scope="col" className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(blogs) &&
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id || index}
                  blog={blog}
                  fetchblogs={fetchBlogs}
                  index={index + 1}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
