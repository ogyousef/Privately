"use clinet";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';


const page = () => {
  
  return (
    <div>
       <section className="mb-10 mt-10 max-w-fit" >
      <h1>Create & Share Private Chats</h1>
    </section>
    <button className="black_btn" > <a href="/Chats">Create a New Chat</a> </button>
    </div>
   
  );
};
export default page;
