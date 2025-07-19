import { LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useAppContext()

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-white">
        <h1
          onClick={() => navigate('/admin')}
          className="text-2xl font-bold cursor-pointer"
        >
          InkWell<span className="text-blue-600">.AI</span>
        </h1>

        <button onClick={logout} className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-full cursor-pointer font-medium">
          Logout
          <LogOut size={20} />
        </button>
      </div>

      {/* sidebar */}
      <div className='flex h-calc(100vh-70px)'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
