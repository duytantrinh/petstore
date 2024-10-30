import React from "react"
import {Label} from "./ui/label"
import {Input} from "./ui/input"

import {logIn, signUp} from "@/actions/actions"
import {toast} from "sonner"
import {Button} from "./ui/button"

type AuthFormProps = {
  type: "logIn" | "signUp"
}

export default function AuthForm({type}: AuthFormProps) {
  return (
    <form action={type === "logIn" ? logIn : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
        />
      </div>

      <Button>{type === "logIn" ? "Log In" : "Sign Up"}</Button>
    </form>
  )
}