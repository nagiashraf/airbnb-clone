import Navbar from '@/components/navbar/Navbar'
import { Link } from '@inertiajs/react'
import { Toaster } from 'react-hot-toast'

export default function AppLayout({ children: children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Navbar />

      {children}
    </>
  )
}
