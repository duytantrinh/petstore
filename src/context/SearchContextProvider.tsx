"use client"

import React, {createContext, useContext, useState} from "react"

type SearchContextProviderProps = {
  children: React.ReactNode
}

type TSearchContext = {
  searchQuery: string
  handleChangeSearchQuery: (newValue: string) => void
}

export const SearchContext = createContext<TSearchContext | null>(null)

export function SearchContextProvider({children}: SearchContextProviderProps) {
  //(1. state)
  const [searchQuery, setSearchQuery] = useState("")

  // (2. derivedState)

  // (3. event handlers / action)
  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue)
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error("useSearchContext was used outside Provider")
  }

  return context
}
