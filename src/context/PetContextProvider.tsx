"use client"
import {addPet, deletePet, editPet} from "@/actions/actions"

import {PetEssential} from "@/lib/type"
import {Pet} from "@prisma/client"

import React, {createContext, useContext, useOptimistic, useState} from "react"
import {toast} from "sonner"

type PetContextProviderProps = {
  data: Pet[]
  children: React.ReactNode
}

type TPetContext = {
  pets: Pet[]
  selectedPetId: Pet["id"] | null
  selectedPet: Pet | undefined
  numOfPets: number
  handleAddPet: (newPet: PetEssential) => Promise<void>
  handleEditPet: (petId: Pet["id"], newPetdata: PetEssential) => Promise<void>
  handleChangeSelectedPetId: (id: Pet["id"]) => void
  handleCheckOutPet: (id: Pet["id"]) => Promise<void>
}

export const PetContext = createContext<TPetContext | null>(null)

export function PetContextProvider({data, children}: PetContextProviderProps) {
  //(1. state)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null) // check petId active

  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    // state === optimisticPets
    (state, {action, payload}) => {
      switch (action) {
        case "add":
          // ... payload === ...newPet without id
          return [...state, {...payload, id: Math.random().toString()}]
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return {...pet, ...payload.newPetData}
            }
            return pet
          })
        case "delete":
          return state.filter((pet) => pet.id !== payload)

        default:
          return state
      }
    }
  )

  // (2. derivedState)
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  //{hover vào các method, filter, find... sẽ thấy được các type có thể xảy ra cho result : dùng cho typescript}

  const numOfPets = optimisticPets.length

  // (3. event handlers / action)

  //=========== ADD new pet

  const handleAddPet = async (newPet: PetEssential) => {
    setOptimisticPets({action: "add", payload: newPet})

    const error = await addPet(newPet)

    if (error) {
      toast.warning(error.message)
      return
    }
  }

  //============= Edit

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssential) => {
    setOptimisticPets({
      action: "edit",
      payload: {
        id: petId,
        newPetData,
      },
    })

    const error = await editPet(selectedPet?.id, newPetData)

    if (error) {
      toast.warning(error.message)

      return
    }
  }

  //===== Delete
  const handleCheckOutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({action: "delete", payload: petId})

    await deletePet(petId)
    setSelectedPetId(null)
  }

  // find pet active
  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        numOfPets,
        handleAddPet,
        handleEditPet,
        handleCheckOutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}

export function usePetContext() {
  const context = useContext(PetContext)

  if (!context) {
    throw new Error("usePetCOntext was used outside Privider")
  }

  return context
}
