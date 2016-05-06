import React from 'react'
import Navbar from 'client/components/nav/Navbar'

export default function HaikuNavbar(props) {
  return <Navbar {...props} title="Haiku" titleUrl="/haiku" />
}
