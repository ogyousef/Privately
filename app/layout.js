'use client';

import 'styles/globals.css'
import Navbar from "components/Nav";
import Chat from 'components/Chat';
import ChatLists from '@/components/ChatLists';
import { UserAuth,AuthContextProvider } from '../context/AuthContext';
// import { ChatList } from 'react-chat-elements';

// export const metadata = {
//   title: 'Privately',
//   description: 'Create an annyomoys shareable chats',
// };


export default function RootLayout({ children }) {

    
  return (
    <html lang='en'>
    <body>

      <AuthContextProvider>
      <div className='main'>
        </div>
        <div className='app '>

          <Navbar />
          {children}

        </div>
      </AuthContextProvider>
        
    </body>
  </html>
  )
}
