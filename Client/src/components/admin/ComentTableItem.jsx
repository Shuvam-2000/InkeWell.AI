import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ComentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment
  const BlogDate = new Date(createdAt)
  const { axios } = useAppContext();

  // functionality to approve comment
  const approveComment = async () => {
    try {
      const { data } = await axios.patch('/api/user/approvecomment', { id: _id })
      if(data.success){
        toast.success(data.message)
        await fetchComments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // functionaity to delete any comment
  const deleteComment = async () => {
    try {
      const { data } = await axios.delete('/api/user/deletecomment', { data: { id: _id }})
      if(data.success){
        toast.success(data.message)
        await fetchComments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
        <br/>
        <br/>
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br/>
        <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
      </td>
      <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!comment.isApproved ? <img onClick={approveComment} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' /> : <p className='text-xs bodrer text-white border-green-600 bg-green-600 rounded-full px-3 py-1'>Approved</p>}
          <img onClick={deleteComment} src={assets.bin_icon} className='w-4 hover:scale-110 cursor-pointer'/>
        </div>
      </td>
    </tr>
  )
}

export default ComentTableItem
