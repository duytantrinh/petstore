"use client"

import {usePetContext} from "@/context/PetContextProvider"
import {useSearchContext} from "@/context/SearchContextProvider"
import {cn} from "@/lib/utils"
import Image from "next/image"
import React from "react"

export default function PetList() {
  const {pets, selectedPetId, handleChangeSelectedPetId} = usePetContext()
  const {searchQuery} = useSearchContext()

  let filteredPets = pets

  filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  )

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex gap-3 items-center px-5 py-2 h-[70px] w-full cursor-pointer text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition duration-300",
              selectedPetId === pet.id && "bg-[#eff1f2]"
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="pet photo"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
