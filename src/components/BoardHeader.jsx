import { useState, useEffect, useRef } from "react";
import {
  DownOutlined,
  CopyOutlined,
  MoreOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { supabase } from "../lib/supabase";

export default function BoardHeader({ board }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      {/* 👉 ปุ่มชื่อ Board */}
      <div className="relative mb-6" ref={dropdownRef}>
        <button
          className="flex items-center text-2xl font-semibold hover:bg-blue-200 px-3 py-1 rounded"
          onClick={() => setOpen(!open)}
        >
          {board.name}
          <DownOutlined className="ml-2 text-base" />
        </button>

        {open && (
          <div className="absolute z-10 mt-2 w-96 bg-white shadow-lg rounded-xl border p-5">
            <div className="text-xl font-semibold mb-2">{board.name}</div>

            {/* Description */}
            <input
              type="text"
              placeholder="Add a description"
              className="w-full border rounded px-3 py-1 text-sm mb-4"
              defaultValue={board.description || ""}
            />

            <hr className="mb-4" />

            <div className="text-sm text-gray-600 font-semibold mb-5">
              Board info
            </div>

            <div className="text-sm space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Board type</span>
                <span className="flex items-center gap-1 text-black">
                  📋 Main
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Owner</span>
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold">
                    {board.created_by?.[0] || "U"}
                  </div>
                  {board.created_by || "Unknown"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Created by</span>
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold">
                    {board.created_by?.[0] || "U"}
                  </div>
                  on {new Date(board.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Notifications</span>
                <span>🔔 Everything</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 👉 Toolbar ขวา */}
      <div className="flex items-center gap-4">
        {/* Start discussion */}
        <button className="hover:bg-gray-100 p-2 rounded">
          <MessageOutlined />
        </button>

        {/* Avatars */}
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-pink-500 text-white text-sm flex items-center justify-center border-2 border-white">SP</div>
          <div className="w-8 h-8 rounded-full bg-red-500 text-white text-sm flex items-center justify-center border-2 border-white">Z</div>
          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 text-sm flex items-center justify-center border-2 border-white">+4</div>
        </div>

        {/* Invite + Copy */}
        <div className="flex items-center border rounded overflow-hidden">
          <button className="px-3 py-1 text-sm hover:bg-gray-100">Invite / 3</button>
          <button className="px-2 py-1 hover:bg-gray-100 border-l">
            <CopyOutlined style={{ fontSize: 14 }} />
          </button>
        </div>

        {/* More options */}
        <button className="hover:bg-gray-100 p-2 rounded">
          <MoreOutlined />
        </button>
      </div>
    </div>
  );
}
