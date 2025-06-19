import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="text-[#414141] py-14 px-6 sm:px-20 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 sm:gap-20">
        
        {/* Left: Branding */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600 font-mono">
            InkWell.<span className="text-black">AI</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-mono text-gray-600 max-w-xs">
            Discover, explore, and get access to the latest blogs. Increase your knowledge with InkWell.AI.
          </p>
        </div>

        {/* Middle: Explore / Add Blog */}
        <div className="flex flex-col gap-2">
          <h2 className="text-base sm:text-lg font-semibold">Explore</h2>
          <p onClick={() => navigate('/admin')} className=" cursor-pointer text-sm hover:text-gray-700 text-gray-600 font-mono">
            Go to Dashboard
          </p>
          <p onClick={() => navigate('/admin/addblog')} className=" cursor-pointer text-sm hover:text-gray-700 text-gray-600 font-mono">
            Add Your Blog
          </p>
        </div>

        {/* Right: Social Media */}
        <div className="flex flex-col items-start sm:items-end gap-2">
          <h2 className="text-base sm:text-lg font-semibold">Get in Touch</h2>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-indigo-600">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-500">
              <Twitter size={20} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
