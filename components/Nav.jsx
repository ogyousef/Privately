import React, {useState, useEffect} from "react";
import Link from "next/link";
import {UserAuth} from "../context/AuthContext";
import {db} from "@/firebase";
import {addDoc, collection, getDoc, query, where,getDocs,doc, setDoc,serverTimestamp} from "@firebase/firestore";

async function CreateUser(User) {
  const UsersRef = collection(db, "Users");
  //{alert(User.uid)}
  //const q = query(UsersRef, where("Id", "==", User.uid));
  const snap = await getDoc(doc(db, 'Users', User.uid))
if (snap.exists()) {
  //console.log(snap.data())
}
else {
  const newUserRef = doc(db,"Users",User.uid)
  await setDoc(newUserRef, {
    Name: User.displayName,
    Id:User.uid,
    Email: User.email,
    picture: User.photoURL,
    Chats: [],
    CreateDate: serverTimestamp()
  });
  console.log("sasdsa")
}
}

const Navbar = () => {
  const {user, googleSignIn, logOut} = UserAuth();
  const [loading, setLoading] = useState(true);
  const UsertoPass = user;
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  {
    user ? CreateUser(user) : console.log("Not Logged in");
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(user.uid)
  //console.log(UsertoPass.uid)
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/Chats">Chats</Link>
        </li>

        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Login
          </li>
          <li onClick={handleSignIn} className="p-2 cursor-pointer">
            Sign up
          </li>
        </ul>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
