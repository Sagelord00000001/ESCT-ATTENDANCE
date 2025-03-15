'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { GraduationCap, Hand, LayoutDashboard, Settings } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
    const { user } = useKindeBrowserClient();
    const menuList = [
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
        },
        {
            id: 3,
            name: 'Attendance',
            icon: Hand,
            path: '/dashboard/attendance'
        },
        {
            id: 4,
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ]
    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className='border shadow-md dark:bg-gray-800 dark:border-gray-700 w-full md:w-64 md:h-screen'>
            {/* Logo for Medium and Larger Screens */}
            <div className='hidden md:flex justify-center pt-4'>
                <Image
                    src={"/logo.png"}
                    width={180}
                    height={80}
                    alt='logo'
                    className='dark:invert'
                />
            </div>

            <hr className='my-5 dark:border-gray-700 hidden md:block'></hr>

            {/* Menu Items */}
            <div className='flex flex-row md:flex-col gap-2 p-2 md:p-0'>
                {menuList.map((menu, index) => (
                    <Link key={index} href={menu.path}>
                        <h2 className={`flex items-center gap-3 text-lg p-2 md:p-6 text-slate-600 hover:bg-primary hover:text-white cursor-pointer dark:hover:text-black rounded-lg ${path == menu.path && 'bg-primary text-white'} dark:text-gray-300 dark:hover:bg-gray-700`}>
                            <menu.icon className='dark:text-gray-300' />
                            <span className='hidden md:inline'>{menu.name}</span>
                        </h2>
                    </Link>
                ))}
            </div>

            {/* User Info for Medium and Larger Screens */}
            <div className='hidden md:flex gap-2 items-center bottom-5 fixed p-4'>
                <Image
                    src={user?.picture || '/default-avater.png'}
                    alt="User"
                    width={35}
                    height={35}
                    className="rounded-full"
                />
                <div>
                    <h2 className='text-xs font-bold dark:text-gray-300'>{user?.given_name} {user?.family_name}</h2>
                    <h3 className='text-[10px] text-slate-400 dark:text-gray-500'>{user?.email}</h3>
                </div>
            </div>
        </div>
    )
}

export default SideNav