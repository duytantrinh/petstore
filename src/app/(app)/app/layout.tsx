import AppFooter from "@/components/AppFooter"
import AppHeader from "@/components/AppHeader"
import BackgroundPattern from "@/components/BackgroundPattern"
import {Toaster} from "@/components/ui/sonner"
import {PetContextProvider} from "@/context/PetContextProvider"
import {SearchContextProvider} from "@/context/SearchContextProvider"
import prisma from "@/lib/db"
import {auth} from "@/lib/auth"
import React from "react"
import {redirect} from "next/navigation"
import {getPetByUserId} from "@/lib/server_utils"

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({children}: LayoutProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const pets = await getPetByUserId(session.user.id)

  return (
    <>
      <BackgroundPattern />

      <div className="max-w-[1050px] mx-auto px-4 flex flex-col justify-between min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  )
}
