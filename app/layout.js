import 'styles/globals.css'

import Nav from "components/Nav";
import  Provider  from 'components/Provider';

export const metadata = {
  title: 'Privately',
  description: 'Create an annyomoys shareable chats',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className="gardient" />
        </div>
        <main className='app'>
          <Nav />
          {children}
        </main>
        </Provider>
    </body>
  </html>
  )
}
