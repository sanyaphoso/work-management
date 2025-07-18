import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef()
  const navigate = useNavigate()

  const toggleMenu = () => setOpen(!open)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  // ปิด dropdown ถ้าคลิกนอกเมนู
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = user?.user_metadata?.full_name || user?.email || 'User'

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu}>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&bold=true`}
          alt="avatar"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            {displayName}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            🔓 Logout
          </button>
        </div>
      )}
    </div>
  )
}
