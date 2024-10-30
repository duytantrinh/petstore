"use client"
import {usePetContext} from "@/context/PetContextProvider"

import Image from "next/image"
import React, {useTransition} from "react"
import PetButton from "./PetButton"

import {Pet} from "@prisma/client"

export default function PetDetail() {
  const {selectedPet} = usePetContext()

  return (
    <section className="w-full h-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar selectedPet={selectedPet} />
          <OtherInfo selectedPet={selectedPet} />
          <Notes selectedPet={selectedPet} />
        </>
      )}
    </section>
  )
}

function EmptyView() {
  return (
    <div className="h-full flex justify-center items-center">
      <h2 className="text-3xl font-semibold">No Pet selected</h2>
    </div>
  )
}

type Props = {
  selectedPet: Pet // do đã loại trừ trường hợp EmptyvIew nên ko cần gán type undefined nữa
}

function TopBar({selectedPet}: Props) {
  // const [isPending, startTransition] = useTransition()

  const {handleCheckOutPet} = usePetContext()

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={selectedPet?.imageUrl}
        alt="Selected image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedPet?.name}
      </h2>

      <div className="ml-auto space-x-2">
        <PetButton actionType="Edit">Edit</PetButton>
        <PetButton
          actionType="Checkout"
          // disabled={isPending}
          onClick={async () => {
            await handleCheckOutPet(selectedPet?.id)
          }} //{gọi server action tại Button}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  )
}

function OtherInfo({selectedPet}: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
      </div>
    </div>
  )
}

function Notes({selectedPet}: Props) {
  return (
    <>
      {/* (flex-1 sẽ chiếm grow ra hết phần còn lại của height) */}
      <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light flex-1">
        {selectedPet?.notes}
      </section>
    </>
  )
}
