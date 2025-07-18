import { Bell, HelpCircle, User, Users, Search } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Link } from "react-router-dom";
import { supabase } from '../lib/supabase'
import UserMenu from './UserMenu'


export default function Topbar() {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
    const fetchUser = async () => {
        const { data } = await supabase.auth.getUser()
        setCurrentUser(data?.user)
    }
    fetchUser()
    }, [])

  return (
    <header className="flex justify-between items-center bg-indigo-50 px-6 py-1">
      {/* Logo ด้านซ้าย */}
      <Link to="/home" className="flex items-center space-x-2 rounded-sm px-1 py-2 hover:bg-indigo-100">
        <img src="/logo.png" alt="Logo" className="h-6" />
        <span className="font-bold text-gray-700">xingqiyi</span> 
        <span className="text-sm text-gray-500">Work Management</span>
      </Link>

      {/* Icons ด้านขวา */}
      <div className="flex space-x-4 items-center gap-4">
        <Search className="h-5 w-5 cursor-pointer" />
        <Users className="h-5 w-5 cursor-pointer" />
        <Bell className="h-5 w-5 cursor-pointer" />
        <HelpCircle className="h-5 w-5 cursor-pointer" />
        <UserMenu user={currentUser} />
      </div>
    </header>
  )
}
