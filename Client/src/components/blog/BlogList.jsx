import { useState } from 'react'
import { blog_data, blogCategories } from '../../assets/assets'
import { motion } from "framer-motion"
import BlogCard from './BlogCard' 

const BlogList = () => {

    // state for selecting menu  
    const [menu, setMenu] = useState("All")

    // Filter blogs based on selected category
    const filteredBlogs = menu === "All"
    ? blog_data
    : blog_data.filter(blog => blog.category === menu)

  return (
    <div>
      {/* Blogs Menu */}
      <div className='overflow-x-auto'>
        <div className='flex justify-start sm:justify-center gap-4 sm:gap-8 my-10 px-4 min-w-max w-full'>
          {blogCategories.map((item) => (
            <div key={item} className='relative'>
              <button
                onClick={() => setMenu(item)}
                className={`relative cursor-pointer text-gray-500 ${
                  menu === item ? 'text-white px-4 pt-0.5' : ''
                }`}
              >
                {menu === item && (
                  <motion.div
                    layoutId='underline'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className='absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full'
                  />
                )}
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 mb-24 sm:mx-16 xl:mx-40'>
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
