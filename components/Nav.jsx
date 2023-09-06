'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
function Nav() {

  // data 拿出来 rename -> session
  const { data: session } = useSession();

  // const isUserLoggedIn = true;


  // for next auth
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvidersAsync = async () => {
      const response = await getProviders();
      console.log("res ", response)
      setProviders(response)
    }
    console.log("hi")
    setProvidersAsync();
  }, [])

  // toggle dropdown
  const [toggleDropDown, setToggleDropDown] = useState(false);


  return (
    <nav className=" flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="logo" />
        <p className="logo_text">MagicPhoto</p>
      </Link>

      {/* desktop navigation */}
      {/* 这里有 responsive design */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">Create Post</Link>
            <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>
            <Link href="/profile">
              <Image src="/assets/images/logo.svg" width={37} height={37} alt="logo" className="rounded-full" />
            </Link>
          </div>
        ) : (
          <div>
            {providers && Object.values(providers).map(provider => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            )

            )}

          </div>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="logo"
              className="rounded-full"
              onClick={() => { setToggleDropDown((prev) => !prev) }}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}>
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ) : (
          <div>
            {providers && Object.values(providers).map(provider => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}

          </div>

        )}
      </div>
    </nav>
  )
}

export default Nav
