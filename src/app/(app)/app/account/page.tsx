import ContentBlock from "@/components/ContentBlock"
import H1 from "@/components/H1"
import SignOutButton from "@/components/SignOutButton"
import {auth} from "@/lib/auth"
import {redirect} from "next/navigation"

export default async function Page() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main>
      <H1 className="my-8 text-white">Your account</H1>
      <ContentBlock className="h-[600px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {session?.user.email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  )
}
