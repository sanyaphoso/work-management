// components/BoardGroup.tsx
import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, User } from "lucide-react";
import clsx from "clsx";

const statusColor = {
  "Working on it": "bg-orange-400 text-white",
  Done: "bg-green-500 text-white",
  Default: "bg-gray-300 text-gray-700",
};

const sampleItems = [
  { title: "Item 1", person: true, status: "Working on it", date: "Jul 13" },
  { title: "Item 3", person: true, status: "Default", date: "Jul 16" },
  { title: "Item 2", person: true, status: "Done", date: "Jul 13" },
];

type Item = {
  title: string;
  person?: boolean;
  status?: string;
  date?: string;
};

export default function BoardGroup({ groupName = "Group Title", items = [] }: { groupName: string, items: Item[] }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="border rounded-md overflow-hidden mb-6">
      {/* Group Header */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-white hover:bg-gray-50 cursor-pointer border-l-[5px] border-blue-500"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2 text-blue-600 font-medium">
          {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          {groupName}
        </div>
        <span className="text-sm text-gray-400">
          {/* {sampleItems.length} Items */}
          {items.length} Items
        </span>
      </div>

      {!collapsed && (
        <div className="overflow-x-auto">
          {/* Column Header */}
          <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-600 border-t border-b border-gray-300">
            <div className="px-4 py-2 border-r border-gray-200">
              <input type="checkbox" />
            </div>
            <div className="px-4 py-2 border-r border-gray-200">Item</div>
            <div className="px-4 py-2 border-r border-gray-200">Person</div>
            <div className="px-4 py-2 border-r border-gray-200">Status</div>
            <div className="px-4 py-2 border-r border-gray-200">Date</div>
            <div className="px-4 py-2 flex justify-center items-center">
              <Plus size={16} className="text-blue-500 cursor-pointer" />
            </div>
          </div>

          {/* Rows */}
          {sampleItems.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-6 items-center border-b border-gray-200 text-sm hover:bg-gray-50"
            >
              <div className="px-4 py-2 border-r border-gray-200">
                <input type="checkbox" />
              </div>
              <div className="px-4 py-2 border-r border-gray-200">
                {item.title}
              </div>
              <div className="px-4 py-2 border-r border-gray-200">
                {item.person && <User size={18} className="text-gray-500" />}
              </div>
              <div className="px-4 py-2 border-r border-gray-200">
                <span
                  className={clsx(
                    "px-2 py-1 rounded text-xs",
                    statusColor[item.status] || statusColor["Default"]
                  )}
                >
                  {item.status}
                </span>
              </div>
              <div className="px-4 py-2 border-r border-gray-200">
                {item.date}
              </div>
              <div className="px-4 py-2"></div>
            </div>
          ))}

          {/* Add item row */}
          <div className="grid grid-cols-6 border-t border-gray-300 text-sm text-gray-500 hover:bg-gray-50">
            <div className="border-r border-gray-200"></div>
            <div className="px-4 py-2 cursor-pointer border-r border-gray-200">
              + Add item
            </div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div className="border-r border-gray-200"></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
