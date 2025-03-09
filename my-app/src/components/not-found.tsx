import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src="/not-found.png" alt="not found" className='w-60 h-full' />
            <h1 className='text-white text-lg text-cente font-boldr'>Not found</h1>
        </div>
    )
}

export default NotFound;