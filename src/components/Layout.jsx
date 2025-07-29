import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-indigo-50">
      <Topbar />
      <div className="flex flex-1 overflow-hidden gap-2">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white rounded-xl shadow-md p-4 border border-gray-200">
          <Outlet />
        </main>
      </div>
    </div>
  )
}