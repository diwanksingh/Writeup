import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div className='w-full p-4 bg-white bg-opacity-60 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'>
        {/* Image Section */}
        <div className='w-full mb-6'>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-[250px] object-scale-down rounded-xl'
          />
        </div>

        {/* Title Section */}
        <h2 className='text-2xl font-semibold text-gray-900 bg-white bg-opacity-70 p-3 rounded-lg mt-2'>{title}</h2>
        
      </div>
    </Link>
  );
}

export default PostCard;
