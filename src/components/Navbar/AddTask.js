import React from 'react';

const AddTask = () => {
    return (
        <form className='w-full md:w-[95%] max-w-7xl mx-auto'>
            <div className='w-1/2 mx-auto relative flex items-center'> 
                <input type="text" className='h-16 w-full rounded-full pl-4 text-2xl border-none shadow-inner' placeholder='Enter your task' />
                <button type='submit' className='absolute right-2 bg-green-600 p-3 rounded-full font-bold text-white transition hover:-translate-1 hover:scale-110 duration-200 shadow-md'>GO</button>
            </div>
        </form>
    );
};

export default AddTask;