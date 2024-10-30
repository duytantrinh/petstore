"use client"
import {useSearchContext} from "@/context/SearchContextProvider"
import React from "react"

export default function SearchForm() {
  const {searchQuery, handleChangeSearchQuery} = useSearchContext()

  return (
    <form className="w-full h-full">
      <input
        type="search"
        placeholder="Search pet..."
        className=" w-full h-full px-5 bg-white/20 rounded-md outline-none transition duration-300 focus:bg-white/50  hover:bg-white/30 placeholder:text-white/50"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  )
}
