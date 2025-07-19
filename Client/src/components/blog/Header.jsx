import { useRef } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  // function for blog search
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  // function for clear search
  const clearSearch = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm">
          <p>Now with AI-Powered Features</p>
          <img src={assets.star_icon} className="w-2.5" alt="star-icon" />
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-snug text-gray-800">
          Create. Share. Inspire — <br />{" "}
          <span className="text-indigo-600">All in One Place.</span>
        </h1>
        <p className="my-6 sm:my-8 mx-w-2xl m-auto max-sm:text-xs text-gray-500">
          InkWell.AI is your personal space to write, publish, and grow — now
          supercharged with AI tools to help you blog smarter and faster.
        </p>

        {/* search box */}
        <form onSubmit={handleSubmit} className="flex justify-between max-w-lg max-sm:scale-80 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
          <input ref={inputRef} className="w-full pl-4 rounded-2xl" type="text" placeholder="Search For Blogs" required />
          <button className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer" type="submit">Search</button>
        </form>
      </div>
      <div className="text-center">
        { 
        input && <button onClick={clearSearch} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">Clear Search</button>
        }
      </div>
      <img
        src={assets.gradientBackground}
        alt="gradient-background"
        className="absolute -top-50 -z-10 opacity-50"
      />
    </div>
  );
};

export default Header;
