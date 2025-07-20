import BlogCard from './BlogCard' 
import { useAppContext } from '../../context/AppContext'

const BlogList = () => {
    const { blogs, input } = useAppContext()

    // fetching search filters and implemented search query logic
    const searchFilter = () => {
      if(input === ''){
        return blogs
      }
      return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

  return (
    <div>
      {/* Blogs Menu */}
      <div className='overflow-x-auto'>
      {/* Blog Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 mb-24 sm:mx-16 xl:mx-40'>
        {searchFilter().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default BlogList
