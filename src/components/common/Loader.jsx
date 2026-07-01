import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
        Loading...
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;