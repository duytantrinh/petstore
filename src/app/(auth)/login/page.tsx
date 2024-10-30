import AuthForm from "@/components/AuthForm"
import H1 from "@/components/H1"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>
      <p>For testing: </p>
      <p>Email: example@gmail.com</p>
      <p>Password: example</p>
      <AuthForm type="logIn" />
      <p className="my-6">
        No account yet?{" "}
        <Link href="/signup" className="text-zinc-500 mt-6 text-sm font-bold">
          Sign up
        </Link>
      </p>
    </main>
  )
}
