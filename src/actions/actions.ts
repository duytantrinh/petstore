"use server"

import {auth, signIn, signOut} from "@/lib/auth"
import prisma from "@/lib/db"
import {checkAuth, getPetById} from "@/lib/server_utils"

import {authSchema, petFormSchema, petIdSchema} from "@/lib/zod_validation"
import {Pet, Prisma} from "@prisma/client"
import bcrypt from "bcryptjs"
import {revalidatePath} from "next/cache"
import {redirect} from "next/navigation"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// =========== User actions --------
export async function logIn(formData: FormData) {
  await signIn("credentials", formData)

  redirect("/app/dashboard")
}

export async function logOut() {
  await signOut({
    redirectTo: "/",
  })
}

export async function signUp(formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries())

  const validatedFormData = authSchema.safeParse(formDataObject)

  console.log(validatedFormData)
  if (validatedFormData.success) {
    const {email, password} = validatedFormData.data

    const hashedPassword = await bcrypt.hash(password, 10) // 1. create hashedPassword

    // 2. create new user for database

    try {
      await prisma.user.create({
        data: {
          email,
          hashedPassword,
        },
      })
    } catch (error: any) {
      throw new Error("Email already exist")
    }

    // 3. success
    await signIn("credentials", formData)
  }
}

export async function addPet(petData: unknown) {
  // authentication check
  const session = await checkAuth()

  const validatedPet = petFormSchema.safeParse(petData)
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    }
  }

  // (khi fetching data thì phải bỏ vào try catch để handling Error)
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
    })
  } catch (error) {
    return {
      message: "Could not add pet",
    }
  }

  revalidatePath("/app", "layout")
}

export async function editPet(petId: unknown, newPetData: unknown) {
  // authentication check
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const validatedPet = petFormSchema.safeParse(newPetData)

  const validatedPetId = petIdSchema.safeParse(petId)
  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Invalid pet data",
    }
  }

  // Authorization check
  const pet = await getPetById(validatedPetId.data)

  if (!pet) {
    return {
      message: "Pet not found",
    }
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    }
  }

  // Database mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    })
  } catch (error) {
    return {
      message: "Could not Edit pet",
    }
  }

  revalidatePath("/app", "layout")
}

export async function deletePet(petId: unknown) {
  // authentication check
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const validatedPetId = petIdSchema.safeParse(petId)
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    }
  }

  // Authorization Check(user owns pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  })
  if (!pet) {
    return {
      message: "Pet not found",
    }
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized",
    }
  }

  // Database Mutation
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    })
  } catch (error) {
    return {
      message: "Could not Delete pet",
    }
  }

  revalidatePath("/app", "layout")
}
