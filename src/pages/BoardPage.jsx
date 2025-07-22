// /pages/BoardPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Button, Table, Tag, Input, Collapse } from "antd";
import { supabase } from "../lib/supabase";
import { PlusOutlined } from "@ant-design/icons";
import BoardGroup from "../components/BoardGroup";

const { Title } = Typography;

const defaultColumns = [
  { title: "Item", dataIndex: "title", key: "title", editable: true },
  { title: "Person", dataIndex: "person", key: "person", editable: true },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    editable: true,
    render: (status) => {
      const color =
        status === "Done"
          ? "green"
          : status === "Working on it"
          ? "orange"
          : "gray";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  { title: "Date", dataIndex: "date", key: "date", editable: true },
];

export default function BoardPage() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "To Do",
      items: [{ id: 1, name: "Design homepage", person: "John", status: "Working on it", date: "2025-07-15" }],
    },
    {
      id: 2,
      name: "In Progress",
      items: [],
    },
  ]);

  const handleAddGroup = () => {
    const newGroup = {
      id: Date.now(),
      name: `New Group`,
      items: [],
    };
    setGroups([...groups, newGroup]);
  };

  const handleAddItem = (groupId) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              items: [
                ...group.items,
                {
                  id: Date.now(),
                  name: "New task",
                  person: "Unassigned",
                  status: "Not started",
                  date: new Date().toISOString().split("T")[0],
                },
              ],
            }
          : group
      )
    );
  };

  return (
    <div className="p-6">
      <BoardGroup groupName="Marketing Tasks" />
      <BoardGroup groupName="Development Backlog" />
    </div>
  );
}
