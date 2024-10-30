import {Button} from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex items-center justify-center gap-10">
      <Image
        src="/petsoft-preview.png"
        alt="Preview of PetStore"
        width={519}
        height={472}
      />

      <div>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare </span>with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetStore to easily keep track of pets under your care.
        </p>

        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
