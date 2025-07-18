import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Sidebar() {
  const [showFavorites, setShowFavorites] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation()
  const menuItems = [
    { label: '🏠 Home', path: '/home' },
    { label: '📋 My Work', path: '/my-work' },
    { label: '📊 Dashboard', path: '/dashboard' },
    { label: '⚙️ Settings', path: '/settings' },
  ]

  return (
    <div className="relative">
      <aside
        className={`group bg-white rounded-xl shadow-md p-4 border border-gray-200
        flex flex-col
        ${isCollapsed ? "w-16" : "w-64"}
        transition-all duration-300 ease-in-out relative
      `}
        style={{ minHeight: "100vh" }}
      >

        {/* ✅ ปุ่ม toggle อยู่ใน group และด้านขวากลางของ sidebar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="
            absolute top-10 -right-3
            bg-indigo-100 text-indigo-700 shadow-md
            opacity-0 pointer-events-none
            group-hover:opacity-100 group-hover:pointer-events-auto
            w-6 h-6 rounded-full flex items-center justify-center
            transition-opacity duration-300 z-10
          "
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        <nav className="flex flex-col space-y-3 text-sm text-gray-700 flex-grow">
          {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-md font-medium transition ${
              pathname === item.path
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-indigo-50'
            }`}
          >
            {item.label}
          </Link>
        ))}

          {/* <Link
            to="/"
            className="hover:bg-indigo-100 px-3 py-2 rounded-md font-medium flex items-center"
          >
            <span className="mr-2">🏠</span>
            {!isCollapsed && "Home"}
          </Link>

          <Link
            to="/my-work"
            className="hover:bg-indigo-100 px-3 py-2 rounded-md font-medium flex items-center"
          >
            <span className="mr-2">📋</span>
            {!isCollapsed && "My Work"}
          </Link> */}

          <div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-indigo-100 font-medium flex items-center"
            >
              <span className="mr-2">⭐</span>
              {!isCollapsed && <>Favorites {showFavorites ? "▾" : "▸"}</>}
            </button>
            {showFavorites && !isCollapsed && (
              <div className="ml-8 text-sm text-gray-500">
                <p>No favorites yet</p>
              </div>
            )}
          </div>

          <div className="pt-2">
            {!isCollapsed && (
              <>
                <p className="font-semibold px-3 py-1 text-gray-600 flex items-center">
                  <span className="mr-2">🧩</span> Workspaces
                </p>
                <select className="w-full border rounded-md mt-1 mb-2 px-2 py-1 text-sm">
                  <option>Main workspace 1</option>
                </select>
                <Link
                  to="/workspace-1-1"
                  className={`ml-4 block rounded px-2 py-1 text-sm font-medium ${
                    pathname === "/workspace-1-1"
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:underline"
                  }`}
                >
                  - workspace 1.1
                </Link>
              </>
            )}
          </div>

          <Link
            to="/dashboard"
            className="hover:bg-indigo-100 px-3 py-2 rounded-md font-medium flex items-center"
          >
            <span className="mr-2">📊</span>
            {!isCollapsed && "Dashboard and reporting"}
          </Link>
        </nav>
      </aside>

    </div>
  );
}
