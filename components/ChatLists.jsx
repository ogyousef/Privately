import {UserAuth} from "../context/AuthContext";
import {useState, useEffect} from "react";
import {ChatList} from "react-chat-elements";
import { useRouter } from 'next/navigation';

import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  deleteField,
  query,
  where,
  FieldValue,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

import {db} from "@/firebase";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function GetUserChats(User) {
  console.log(User)
  const UserRef = doc(db, "Users",User.uid);
  const docSnap = await getDoc(UserRef);
  //console.log(docSnap.data().Chats);
  return docSnap.data().Chats;
}

async function AddUserChats(User, NewChat) {
  console.log(User)
  const UserRef = doc(db, "Users",User.uid);
  await updateDoc(UserRef,{Chats: arrayUnion(NewChat)})

  
}

async function GetChatInfo(User, ChatId) {
  console.log(User)
  const UserRef = doc(db, "Chats",ChatId);
  const docSnap = await getDoc(UserRef);

  const ChatInfo = {Title: docSnap.data().Title,
  }
  console.log(docSnap.data().Title)

  return ChatInfo
}










// Fire Base



const ChatLists = () => {
  async function CreateNewChat(User){
    const RandomChatId = getRandomInt(99999);
    const NewChat = {
      OwnerId:User.uid,
      OwnerName: User.displayName,
      Img: User.photoURL,
      Participants: {},
      Msgs:{},
      Title:RandomChatId,
    }
    const docRef = doc(db, "Chats", RandomChatId.toString())
    await  setDoc (docRef, NewChat)
    AddUserChats(User, RandomChatId);
    setUserChats(prevChats => [...prevChats, RandomChatId]);
  
  }

  const router = useRouter();
  
  const HandleChat =(id) =>{
    router.push(`/Chats/${id}`);
    }

    const DeleteChat = async (User,id) => {

      const UserRef = doc(db, "Users",User.uid);

      await updateDoc(UserRef,{Chats: arrayRemove(id)})

      setUserChats(prevChats => prevChats.filter(chatId => chatId !== id));

   
    }

    const ChatBox = ({ Title, Img,id }) => {
      const defaultTitle = "Title";
      const defaultImg = "https://avatars.githubusercontent.com/u/80540635?v=4";
    
      return (
        <div  className= "">
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: Img || defaultImg, // User Pic
                alt: "kursat_avatar", //
                title: Title || defaultTitle, // Use Title if it exists, otherwise use defaultTitle
                subtitle: "Chat",
                date: new Date(),
                //unread: 3,
               
              },
            ]}
            onClick={()=>{HandleChat(id)}}
            on
          />
        </div>
      );
    };
    

  const [loading, setLoading] = useState(true);
  const [userChats, setUserChats] = useState([]);

  
  const {user, googleSignIn, logOut} = UserAuth();

 
  useEffect(() => {
    if (user) {
      GetUserChats(user).then((results) => {
        setUserChats(results);
        setLoading(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      //v;
    }
  }, [user]);
  
  
   
 
  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        
<div className="flex-row justify-center align-middle">
  <div>
  {userChats.map((chat) => (
          <div className="flex justify-between">          
          <ChatBox  id = {chat} key={chat} Title={chat} Img={user?.photoURL} OwnerName={user?.displayName} />
          <button className="bg-red-100 black_btn" onClick={()=>{DeleteChat(user,chat)}}> delete</button>
          </div>
       
        ))}
  </div>
  <div className="text-center flex justify-center mt-10">  
    <button className="black_btn "onClick={()=>{CreateNewChat(user)}}>Create New Chat</button>
</div>
</div>
      )}
    </div>
  );
};
export default ChatLists;
