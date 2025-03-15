'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { GraduationCap, Hand, LayoutDashboard, Settings } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'




function sideNav() {

    const {user} =useKindeBrowserClient();
    const menuList= [

        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Student',
            icon: GraduationCap,
            path: '/dashboard/students'
        },        {
            id: 3,
            name: 'Attendance',
            icon: Hand,
            path: '/dashboard/attendance'
        },        {
            id: 4,
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ]
    const path = usePathname();
    useEffect(()=>{
        console.log(path)
    },[path])
  return (
    <div className='border shadow-md h-screen py-4 px-8'> 
        <Image
        src={"/logo.svg"}
        width={180}
        height={50}
        alt='logo'/>


        <hr className='my-5'></hr>

        {menuList.map((menu, index) => (
            <Link key={index} href={menu.path}>
            <h2 className={`flex items-center gap-3 text-lg p-6 text-slate-600 hover:bg-primary hover:text-white cursor-pointer dark:hover:text-black rounded-lg ${path==menu.path&& 'bg-primary text-white'}`}>
                <menu.icon/>
                {menu.name}

            </h2>
            </Link>
        ))}
        <div className='flex gap-2 items-center bottom-5 fixed'>
        <Image
            src={user?.picture || '/default-avater.png'}
            alt="User"
            width={35}
            height={35}
            className="rounded-full"
        />
        <div>
            <h2 className='text-xs font-bold'>{user?.given_name} {user?.family_name}</h2>
            <h3 className='text-[10px] text-slate-400'>{user?.email}</h3>
        </div>
    
        </div>
    </div>
    
  )
}

export default sideNav