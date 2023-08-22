"use client";

import "react-chat-elements/dist/main.css";
import {MessageBox} from "react-chat-elements";
import {UserAuth} from "../context/AuthContext";
import Image from "next/image";
import {useState, useEffect} from "react";
import {collection,query,orderBy, limit,getDocs, addDoc, doc, setDoc, getDoc, CollectionReference, serverTimestamp} from "firebase/firestore";
import {db } from "@/firebase";
import { Button } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'
import { stringify } from "postcss";






function Chat(ChatID) {

  const FinalChatID = ChatID.id.replace("/Chats/","")
  const {user, googleSignIn, logOut} = UserAuth();

  const [chatTitle, setChatTitle] = useState("Chat Room");// set Title Here
  const [chatRoomImg, setChatRoomImg] = useState("/assets/images/logo.svg");
  const [isUser, setUser] = useState(true); // Set User here
  const [chatData, setChatData] = useState([]); // Fetch Chat Data
  const [messages, setMessages] = useState([]);
  const [messagesx, setMessagesx] = useState([]);


  async function sendMessage(FinalChatID , User, MsgData)  {
    
    const NewRef = collection(db,"Chats");

    const ChatRef = doc(NewRef,FinalChatID.toString())

    const ChatMsgs = collection(ChatRef, "ChatCollection")

    addDoc(ChatMsgs,{
      senderId: User.uid,
      senderPIC:User.photoURL,
      senderName:User.displayName,
      Time: serverTimestamp(),
      MsgText: MsgData,

    });
  
  }

  // ------------------ Get Messages 
  async function getMessages(FinalChatID){

    const NewRef = collection(db,"Chats");

    const ChatRef = doc(NewRef,FinalChatID.toString())

    const ChatMsgs = collection(ChatRef, "ChatCollection")

    let Msgs = [];

    //const ChatMsgsSnap = await getDocs(ChatMsgs)

    const q = query(ChatMsgs, orderBy("Time", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      Msgs.push(doc)
      console.log(doc)
      // console.log(doc.id, " => ", doc.data());
    });

    // ChatMsgsSnap.forEach((doc) => {
    //   Msgs.push(doc)

    // });

    setMessagesx(Msgs);
    setMessages(Msgs);
    //return Msgs;
    }


  
  const handleSend = async (MsgText) => {
    sendMessage(FinalChatID, user, MsgText);
    getMessages(FinalChatID)
    console.log("SENT")
    //console.log(messagesx[0].data()["MsgText"]);
  }



 

  




  // Fetch Chat

  


  return (
    <div className=" bg-gray-200 w-full rounded-lg rounded-4 m-3 ml-3  flex h-[70vh] border-red-500"> 
      {/* Testing */}
      {/* Title */}

      <div className="border-r border-gray-300 flex-1 overflow-y-scroll p-4"> 
        {messages.map((msg) => {
          if (msg?.data()["senderId"] === user?.uid) {
            return (
              <div className="flex justify-end">
                        <MessageBox
                          position={"right"}
                          title={msg.data()["senderName"]}
                          titleColor={""}
                          type={"text"}
                          text={msg.data()["MsgText"]}
                          
                          replyButton={true}
                          removeButton={true}
                          status={"read"}
                        />
                <img
                  src={
                    user?.photoURL ||
                    "https://facebook.github.io/react/img/logo.svg"
                  }
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                ></img>
              </div>
            );
          } else {
            return (
              <div className="flex items-end ">
                    <div className="flex items-end">
                        <MessageBox
                          position={"left"}
                          title={msg.data()["senderName"]}
                          titleColor={"red"}
                          type={"text"}
                          text={msg.data()["MsgText"]}
                          data={{
                            uri: "https://facebook.github.io/react/img/logo.svg",
                            status: {
                              click: false,
                              loading: 0,
                            },
                          }}
                          avatar={
                            msg.data()["senderPIC"]
                          }
                          replyButton={true}
                          removeButton={true}
                          status={"read"}
                        />
                      </div>
              </div>
            );
          }
        })}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-600">
        <test>COMPY RIGHTS</test>
      </div>
      <div className="flex mt-5 "> 
        <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12  rounded-md py-3"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend(e.target.value);
                  e.target.value = ""
                }
                
              }}
            />
            <button className="black_btn">send</button>
            </div>
        {/* chat input */}
       
      </div>
    </div>
  );



  
}

export default Chat;
