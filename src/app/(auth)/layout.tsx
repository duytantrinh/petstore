import Logo from "@/components/logo"
import React from "react"

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex justify-center items-center min-h-screen gap-y-5 flex-col">
      <Logo />
      {children}
    </div>
  )
}
