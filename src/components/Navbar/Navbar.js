import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className='flex w-full md:w-[95%] max-w-7xl mx-auto bg-[#457b9d] h-16 px-4 mb-6 text-white items-center justify-between rounded-xl '>
            <h1 className='text-2xl font-bold'>Task-Master</h1>
            <label tabIndex={0} className="btn btn-ghost lg:hidden relative" onClick={()=>setShowMenu(!showMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                {/* Mobile menu */}
                <ul className={`absolute w-40 z-10 right-0 ${!showMenu && 'hidden'}`}>
                    <Link to="/mytasks"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>My Task</li></Link>
                    <Link to="/completed"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>Completed Task</li></Link>
                    <Link to="/"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>+ Add Task</li></Link>
                </ul>
            </label>

            <div className='hidden md:block'>
                <ul className='flex ml-4 gap-4'>
                    <Link to="/mytasks"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>My Task</li></Link>
                    <Link to="/completed"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>Completed Task</li></Link>
                </ul>
            </div>
            <div className='hidden md:block'>
                <ul>
                    <Link to="/"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>+ Add Task</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;