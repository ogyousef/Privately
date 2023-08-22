"use client"

import ChatLists from '@/components/ChatLists';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Chat from '@/components/Chat';
import { usePathname } from 'next/navigation';

export default function Page({params}) {
  const { slug } = params
  const pathname = usePathname();
  return (  

    <>
      <Chat id={pathname} /> 
    </>
  )

}
// export default Page