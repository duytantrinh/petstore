"use client"

import {usePetContext} from "@/context/PetContextProvider"

export default function Stats() {
  const {numOfPets} = usePetContext()

  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  )
}
