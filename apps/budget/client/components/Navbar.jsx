import React from 'react'
import Navbar from 'client/components/nav/Navbar'

export default function BudgetNavbar(props) {
  return <Navbar {...props} title="Budget" titleUrl="/budget" />
}
