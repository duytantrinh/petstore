"use client"

import {Button} from "./ui/button"
import React, {useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import PetForm from "./PetForm"
import {flushSync} from "react-dom"

type PetButtonProps = {
  actionType: "add" | "Edit" | "Checkout"
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function PetButton({
  actionType,
  children,
  disabled,
  onClick,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  if (actionType === "Checkout") {
    return (
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    )
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size="icon">{children}</Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit Pet"}
          </DialogTitle>
        </DialogHeader>

        {/* // {gọi flushSync cho state nào thì state đó sẽ thực hiện đầu tiên} */}
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false)
            })
          }}
        />
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
