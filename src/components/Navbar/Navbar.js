import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userTheme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDark, setIsDark] = useState(userTheme || 'light');

    const themeCheck = () => {
        if (userTheme === "dark" || (!userTheme && systemTheme)) {
            document.documentElement.classList.add("dark");
            return;
        }
    }

    const themeSwitch = () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            return;
        }
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }

    const handleDarkMode = () => {
        setIsDark(!isDark);
        themeSwitch();
    }
    themeCheck();
    return (
        <div className='flex w-full md:w-[95%] max-w-7xl mx-auto bg-[#457b9d] dark:bg-stone-900 h-16 px-4 mb-6 text-white items-center justify-between rounded-xl '>
            <h1 className='text-3xl font-extrabold uppercase border-2 border-double rounded-md'>Task-Master</h1>
            <label className="lg:hidden inline-flex relative items-center cursor-pointer">
                <input type="checkbox" onClick={handleDarkMode} value="" className="sr-only peer" defaultChecked={isDark === 'dark' ? true : false} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute dark:border-gray-600 peer-checked:bg-gray-900"></div>
                <span className="ml-3 text-sm font-bold text-gray-900 dark:text-gray-300">Dark</span>
            </label>
            <label tabIndex={0} className="btn btn-ghost lg:hidden relative" onClick={() => setShowMenu(!showMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                {/* Mobile menu */}
                <ul className={`absolute w-40 z-10 right-0 ${!showMenu && 'hidden'}`}>
                    <Link to="/mytasks"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>My Task</li></Link>
                    <Link to="/completed"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>Completed Task</li></Link>
                    <Link to="/"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>+ Add Task</li></Link>
                    {
                        <Link to="/"><li className='bg-gradient-to-tr from-[#1d3557] via-sky-600  to-sky-900  px-2 py-1 rounded-lg font-bold cursor-pointer'>Login<BiLogIn className='inline ml-1' /></li></Link>
                    }
                </ul>
            </label>

            <div className='hidden md:block'>
                <ul className='flex ml-4 gap-4'>
                    <Link to="/mytasks"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>My Task</li></Link>
                    <Link to="/completed"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>Completed Task</li></Link>

                </ul>
            </div>
            <div className='md:flex hidden'>
                <ul className='md:mr-4 md:flex gap-2'>

                    <Link to="/"><li className='bg-[#1d3557] px-2 py-1 rounded-lg font-bold cursor-pointer'>+ Add Task</li></Link>
                    {
                        <Link to="/"><li className='bg-gradient-to-tr from-[#1d3557] via-sky-600  to-sky-900  px-2 py-1 rounded-lg font-bold cursor-pointer'>Login<BiLogIn className='inline ml-1' /></li></Link>
                    }
                    <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" onClick={handleDarkMode} value="" className="sr-only peer" defaultChecked={isDark === 'dark' ? true : false} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute dark:border-gray-600 peer-checked:bg-gray-900"></div>
                        <span className="ml-3 text-sm font-bold text-gray-900 dark:text-gray-300">Dark</span>
                    </label>
                </ul>

            </div>
        </div>
    );
};

export default Navbar;