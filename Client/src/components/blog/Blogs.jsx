import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import Moment from "moment";
import Loader from "../common/Loader";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blogs = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [blogdata, setblogdata] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // fetching blogs data by Id from the backend
  const fetchblogdata = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data?.success ? setblogdata(data.getblogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // fetching comments on each blog with the blogId
  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/getcomment", { blogId: id });
      if (data.success) {
        setComments(data?.comments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // adding comments on each blog
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/addcomment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.meesage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchblogdata();
    fetchComments();
  }, []);

  return blogdata ? (
    <div className="relative">
      {/* background gradient */}
      <img
        src={assets.gradientBackground}
        className="absolute -top-20 -z-10 opacity-50 w-full"
        alt="background"
      />

      <div className="relative z-10">
        {/* blog title */}
        <div className="text-center mt-20 text-gray-600">
          <p className="text-primary py-4 font-medium">
            Published On: {Moment(blogdata.createdAt).format("MMMM Do YYYY")}
          </p>
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto">
            {blogdata.title}
          </h1>
          <h2 className="my-5 max-w-lg truncate mx-auto">
            {blogdata.subTitle}
          </h2>
          <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
            Author Name
          </p>
        </div>

        {/* blog thumbnail image */}
        <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
          <img src={blogdata.image} className="rounded-2xl mb-5" alt="blog" />

          {/* blog content */}
          <div
            className="rich-text max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: blogdata.description }}
          ></div>

          {/* comments section */}
          <div className="mt-14 mb-10 max-w-3xl mx-auto">
            <p className="font-semibold mb-4">Comments: ({comments.length})</p>
            <div className="flex flex-col gap-4">
              {comments.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded text-gray-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} className="w-6" alt="user" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className="absolute right-4 bottom-3 text-xs text-gray-500">
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="max-w-3xl mx-auto">
            <p className="font-semibold mb-4">Add your Comment</p>
            <form
              onSubmit={addComment}
              className="flex flex-col items-start gap-4 max-w-lg"
            >
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-2 border border-gray-300 rounded outline-none"
                type="text"
                placeholder="Enter Your Name"
                required
              />
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                placeholder="Add Your Comment"
                required
              ></textarea>
              <button
                className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          {/* share buttons */}
          <div className="my-24 max-w-3xl mx-auto">
            <p className="font-semibold my-4">
              Share this article on social media
            </p>
            <div className="flex gap-4">
              <img
                className="cursor-pointer"
                src={assets.facebook_icon}
                width={50}
                alt="Facebook"
              />
              <img
                className="cursor-pointer"
                src={assets.twitter_icon}
                width={50}
                alt="Twitter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Blogs;
