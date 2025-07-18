import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset(); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[90%] sm:max-w-md gap-4 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-lg sm:p-8 p-6"
      >
        {/* Header */}
        <div className="inline-flex items-center gap-3 mb-2">
          <p className="font-mono text-3xl">Login</p>
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
            minLength: { value: 4, message: 'Min length should be at least 4' },
            maxLength: { value: 10, message: 'Max length should be at most 10' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
              message: 'Password must include one letter and one number',
            },
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
          // disabled={isSubmitting}
          className="bg-primary text-white font-mono px-10 py-2 mt-4 rounded-lg hover:bg-primary transition-all cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
