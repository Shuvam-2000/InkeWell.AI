import { assets } from "../../assets/assets";


const BlogTableItem = ({ blog, fetchblogs, index }) => {
    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt)
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toLocaleDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${blog.isPublished ? 'text-green-600' : 'text-red-700'}`}>{blog.isPublihsed ? 'Publihsed' : 'Unplublished'}</p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-red-500 hover:text-white transition-all">{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
        <img src={assets.cross_icon} className="w-8 hover:scale-110 transitin-all cursor-pointer" />
      </td>
    </tr>
  )
}

export default BlogTableItem