import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import UploadModal from '../../../Components/UploadModal'

export default function Onboard() {
  return (
    <div>
      <Outlet/>
      <UploadModal/>
      </div>
  )
}
