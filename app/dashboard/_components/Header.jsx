'use client'

import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import SideNav from './SideNav';

function Header() {
    const {user}=useKindeBrowserClient();

  return (
    <div className='p-4 shadow-sm border flex justify-between'>
        <div>
            <Image
                src={user?.picture || '/default-avater.png'}
                width={35}
                height={35}
                alt='user'
                className=' rounded-full'
            />
        </div>
    </div>
  )
}

export default Header