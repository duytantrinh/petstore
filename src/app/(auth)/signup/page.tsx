import AuthForm from "@/components/AuthForm"
import H1 from "@/components/H1"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign Up</H1>
      <AuthForm type="signUp" />
      <p className="my-6">
        Already have account?{" "}
        <Link href="/login" className="text-zinc-500 mt-6 text-sm font-bold">
          Log In
        </Link>
      </p>
    </main>
  )
}
