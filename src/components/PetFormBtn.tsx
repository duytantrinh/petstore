import React from "react"
import {Button} from "./ui/button"
// import {useFormStatus} from "react-dom"

type PetFormBtnProps = {
  actionType: "add" | "Edit"
}

export default function PetFormBtn({actionType}: PetFormBtnProps) {
  return (
    <Button type="submit" className="self-end mt-5">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  )
}
