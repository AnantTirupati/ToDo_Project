import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-cyan-400 text-white py-2'>
            <div className="logo">
                <span className='text-2xl font-bold mx-9 hover:text-slate-500'>TASKon</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all'>HOME</li>
                <li className='cursor-pointer hover:font-bold transition-all'>YOUR TASK</li>
            </ul>
        </nav>
    )
}

export default Navbar
