

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen  text-black space-y-4">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent shadow-lg"></div>

      {/* Optional Loading Text */}
      <p className="text-lg font-semibold tracking-wider animate-pulse">Loading, please wait...</p>
    </div>
  );
};

export default Loader;
