'use client'
import React from 'react'
import { useState } from 'react'
import ModeToggle from "./DarkMode"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'




const Navbar = () => {
    const [search, setSearch] = useState<string>('')
    const pathname = usePathname()


    return (
        <nav className='z-50 w-full h-26 md:h-20 absolute justify-between right-0 gap-10 top-0 shadow-sm shadow-slate-200 dark:shadow-slate-800 flex items-center px-4 md:px-20 lg:px-40 py-4'>
            <div className='hidden md:flex justify-center w-auto h-full items-center gap-5'>
                <Link href={'/'}>
                    <h1 className='font-bold text-2lg'>
                        Student Management System
                    </h1>
                </Link>
                <ModeToggle />
            </div>
            <div className='w-auto h-full flex gap-2 items-center justify-center'>
                <div className='h-full w-auto flex items-center justify-center gap-2 md:gap-5'>
                    <Link href={'/students'}>
                        <p className={`text-sm font-semibold ${pathname.includes("/students") ? 'text-green-500' :'hover:text-green-400'}`}>Students</p>
                    </Link>
                    <Link href={'/courses'}>
                        <p className={`text-sm font-semibold ${pathname.includes("/courses") ? 'text-green-500' :'hover:text-green-400'}`}>Courses</p>
                    </Link>
                </div>
                <form className='w-auto h-full flex items-center justify-center gap-1 md:gap-5 relative' onSubmit={(e) => {
                    e.preventDefault();
                    console.log(search)
                }}>
                    <Input placeholder={`Search ${pathname.includes("/students") ? 'Students' :'Courses'}`} className='w-64' onChange={(e)=>{setSearch(e.target.value)}}/>
                    <Button type='submit' className='bg-green-500 hover:bg-green-400 duration-300'>Search</Button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar