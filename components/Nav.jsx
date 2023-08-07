"use client";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async () => {
      const res = await getProviders();
      setProviders(res);
    };
  }, []);

  return (
    <nav>
      <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="logo"
          className="object-contain"
        />
        <p>Privately</p>
      </Link>

      <div>
        {isLoggedIn ? (
          <div>
            <Link href="/creat-chat" className="black_btn">
              Create a Private Chat{" "}
            </Link>
            <button type="button" className="black_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div>
            <>
              {providers &&
                Object.values(providers).map((providers) => (
                  <button
                    type="button"
                    key={providers.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >Sign In</button>
                ))}
            </>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
