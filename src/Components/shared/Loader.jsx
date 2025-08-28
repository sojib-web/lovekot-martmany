const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-70"></div>
        <div className="absolute inset-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 bg-pink-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
