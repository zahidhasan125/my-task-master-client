import React from 'react';

const Navbar = () => {
    return (
        <div className='flex w-full md:w-[95%] max-w-7xl mx-auto bg-[#457b9d] h-16 px-4 text-white items-center justify-between rounded-xl mb-4'>
            <h1 className='text-2xl font-bold'>Task-Master</h1>
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <div>
                <ul className='flex ml-4 gap-4'>
                    <li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>My Task</li>
                    <li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>Completed Task</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>+ Add Task</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;