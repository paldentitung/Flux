import React from "react";

const PostCardSkeleton = () => (
  <div className="flex flex-col space-y-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-col space-y-1.5">
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-2.5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
  </div>
);

export default PostCardSkeleton;
