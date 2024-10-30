import {z} from "zod"
import {DEFAULT_PET_IMAGE} from "./constants"

// (1. schema cho zod)
export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, {message: "Name is required"}).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, {message: "Owner name is required"})
      .max(100),

    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({message: "Image url must be a valid url"}),
    ]),

    // convert to number
    age: z.coerce.number().int().positive().max(9999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }))

export type TPetForm = z.infer<typeof petFormSchema>

export const petIdSchema = z.string().cuid()

export const authSchema = z.object({
  email: z.string().trim().max(100),
  password: z.string().trim().max(100),
})

export type TAuth = z.infer<typeof authSchema>
