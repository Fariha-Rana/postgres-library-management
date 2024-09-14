const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-4 text-gray-800">
      <div className="w-8 h-8 border-4 border-gray-800 border-t-transparent border-solid rounded-full animate-spin"></div>
      <span className="text-gray-800 text-lg">Loading...</span>
    </div>
  );
};

export default Loading;
