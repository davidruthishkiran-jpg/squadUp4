import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import MobileNavbar from '../components/MobileNavbar'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--color-ink)]">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar />
        <header className="hidden xl:flex items-center gap-4 px-8 py-4 border-b border-[var(--color-ink-border)] sticky top-0 bg-[var(--color-ink)]/95 backdrop-blur z-20">
          <SearchBar className="max-w-md w-full" />
          <Link to="/notifications" className="ml-auto p-2.5 rounded-xl text-[var(--color-mist)] hover:bg-[var(--color-ink-raised)]">
            <Bell size={20} />
          </Link>
        </header>
        <main className="flex-1 pb-20 xl:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileNavbar />
    </div>
  )
}
