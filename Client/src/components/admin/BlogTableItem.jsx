import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, index, fetchblogs }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want delete this blog")
    if(!confirm) return;
    try {
      const { data } = await axios.delete(`/api/blog/delete/${blog._id}`)
      if(data.success){
        toast.success(data.message)
        await fetchblogs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.patch(`/api/blog/publish/${blog._id}`)
      if(data.success){
        toast.success(data.blog.isPublished
          ? "Blog Published Successfully"
          : "Blog Unpublished Successfully")
        await fetchblogs()
      }else{
        toast.error("Something Went Wrong")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-600" : "text-red-700"}`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button onClick={togglePublish} className="border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-red-500 hover:text-white transition-all">
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transitin-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
