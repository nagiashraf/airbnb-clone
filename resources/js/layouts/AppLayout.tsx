import Navbar from '@/components/navbar/Navbar'
import { Link } from '@inertiajs/react'

export default function AppLayout({ children: children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      {children}
    </>
  )
}
