'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
function Nav() {
  return (
    <nav className=" flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} />
        <p className="logo_text">PromptEng</p>
      </Link>
    </nav>
  )
}

export default Nav
