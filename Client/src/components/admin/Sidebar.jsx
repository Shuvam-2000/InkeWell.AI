import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { House, LayoutDashboard, BadgePlus } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        to="/admin"
        end={true}
        className={({ isActive }) => {
          return `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          } hover:bg-primary/10 hover:border-r-4 hover:border-primary`;
        }}
      >
        <LayoutDashboard size={20} />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addblog"
        className={({ isActive }) => {
          return `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          } hover:bg-primary/10 hover:border-r-4 hover:border-primary`;
        }}
      >
        <BadgePlus size={20} />
        <p className="hidden md:inline-block">Add New Blog</p>
      </NavLink>
      <NavLink
        to="/admin/listblog"
        className={({ isActive }) => {
          return `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          } hover:bg-primary/10 hover:border-r-4 hover:border-primary`;
        }}
      >
        <img src={assets.list_icon} className="min-w-4 w-5" />
        <p className="hidden md:inline-block">All Your Blogs</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        className={({ isActive }) => {
          return `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          } hover:bg-primary/10 hover:border-r-4 hover:border-primary`;
        }}
      >
        <img src={assets.comment_icon} className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => {
          return `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? "bg-primary/10 border-r-4 border-primary" : ""
          } hover:bg-primary/10 hover:border-r-4 hover:border-primary`;
        }}
      >
        <House size={20} />
        <p className="hidden md:inline-block">Go to Home</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
