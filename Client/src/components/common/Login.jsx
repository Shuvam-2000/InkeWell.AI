import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react'; 

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/user/login', formData);
      const token = response?.data?.token;

      if (token) {
        setToken(token);      
        toast.success('Login Successful');
        navigate('/admin');         
        reset();                 
      } else {
        toast.error('Login failed: Invalid credentials');
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative px-4">

      {/* Go to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-1 text-sm text-gray-700 hover:text-indigo-600 transition-all border border-black py-2 px-2 rounded cursor-pointer"
      >
        <ArrowLeft size={16} />
        Go to Home
      </button>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full sm:max-w-md gap-4 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-lg sm:p-8 p-6 mt-10"
      >
        {/* Header */}
        <div className="inline-flex items-center gap-3 mb-2">
          <p className="font-mono text-3xl">Admin Login</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Enter Your Email"
          className={`w-full px-3 py-2 text-sm border rounded-md outline-none transition-all ${
            errors.email ? 'border-red-500' : 'border-gray-400 hover:border-black'
          }`}
          {...register('email', {
            required: 'Email is Required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-[-6px]">{errors.email.message}</p>
        )}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter Your Password"
          className={`w-full px-3 py-2 text-sm border rounded-md outline-none transition-all ${
            errors.password ? 'border-red-500' : 'border-gray-400 hover:border-black'
          }`}
          {...register('password', {
            required: 'Password is Required',
            minLength: { value: 4, message: 'Min length should be at least 4' }
          })}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-[-6px]">{errors.password.message}</p>
        )}

        {/* Links */}
        <div className="w-full flex justify-between text-xs mt-1 cursor-pointer">
          <p className="hover:text-[#f21c1c]">Forgot Password?</p>
          <p className="hover:text-[#f21c1c]">Create Your Account</p>
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          className={`bg-primary text-white font-mono px-10 py-2 mt-4 rounded-lg transition-all cursor-pointer ${
            isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-primary'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Login;
