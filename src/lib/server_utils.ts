import "server-only" // install npm i server-only@0.0.1
import {redirect} from "next/navigation"
import {auth} from "./auth"
import {Pet, User} from "@prisma/client"
import prisma from "./db"

export async function checkAuth() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return session
}

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  })

  return pet
}

export async function getPetByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  })

  return pets
}

export async function getUserByEmail(email: User["email"]) {
  prisma.user.findUnique({
    where: {
      email,
    },
  })
}
