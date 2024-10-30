import React from "react"
import logo from "../../public/logo.png"
import Image from "next/image"

export default function Logo() {
  return <Image src={logo} width={30} height={30} alt="Logo" />
}
